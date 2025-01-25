const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const createError = require('http-errors');
const { PrismaClient } = require('@prisma/client');
const { URLSearchParams } = require('url');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.twitterOAuth2Start = async (req, res, next) => {
  try {
    console.log('--- OAUTH START endpoint ---');

    const codeVerifier = crypto.randomBytes(64).toString('hex');
    const codeChallenge = crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');

    const payload = {
      nonce: crypto.randomBytes(16).toString('hex'),
      codeVerifier,
    };

    const stateToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '365d' });

    const callbackURL = `${process.env.BACKEND_URL}/auth/twitter/callback`;

    console.log(
      'Redirecting user to x.com with codeChallenge + callback:',
      callbackURL
    );

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.TWITTER_CLIENT_ID,
      redirect_uri: callbackURL,
      scope: 'tweet.read users.read offline.access',
      state: stateToken,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return res.redirect(
      `https://x.com/i/oauth2/authorize?${params.toString()}`
    );
  } catch (error) {
    console.error('Error in twitterOAuth2Start:', error);
    next(createError(500, 'Error initiating Twitter authentication'));
  }
};

exports.twitterOAuth2Callback = async (req, res, next) => {
  try {
    console.log('--- OAUTH CALLBACK endpoint ---');
    const { code, state } = req.query;
    if (!code || !state) {
      return next(createError(400, 'Missing code or state from Twitter'));
    }

    let decoded;
    try {
      decoded = jwt.verify(state, JWT_SECRET);
    } catch (err) {
      return next(createError(400, 'Invalid state token'));
    }
    console.log('State token decoded =>', decoded);

    const { codeVerifier } = decoded;
    if (!codeVerifier) {
      return next(createError(400, 'Missing codeVerifier in state payload'));
    }

    const callbackURL = `${process.env.BACKEND_URL}/auth/twitter/callback`;
    const tokenUrl = 'https://api.twitter.com/2/oauth2/token';
    console.log('Exchanging code for tokens at tokenUrl:', tokenUrl);

    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.TWITTER_CLIENT_ID,
      redirect_uri: callbackURL,
      code_verifier: codeVerifier,
      code,
    });

    const tokenResponse = await axios.post(tokenUrl, bodyParams.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: {
        username: process.env.TWITTER_CLIENT_ID,
        password: process.env.TWITTER_CLIENT_SECRET,
      },
    });

    const { access_token, refresh_token } = tokenResponse.data;
    if (!access_token) {
      return next(createError(400, 'No access_token returned from Twitter'));
    }
    console.log(
      'Got from Twitter: access_token:',
      access_token,
      ' refresh_token:',
      refresh_token
    );

    console.log('Fetching user info from Twitter with Bearer:', access_token);
    const userResponse = await axios.get('https://api.twitter.com/2/users/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        'user.fields': 'id,username,name',
      },
    });
    const twitterData = userResponse.data?.data;
    if (!twitterData?.id) {
      return next(createError(400, 'Failed to fetch Twitter user info'));
    }
    console.log('Twitter user data =>', twitterData);

    const twitterUsername = twitterData.username;
    console.log('Upserting user in DB =>', twitterUsername);

    let user = await prisma.user.findUnique({
      where: { twitterHandle: twitterUsername },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          twitterHandle: twitterUsername,
          referralCode: crypto.randomBytes(4).toString('hex'),
        },
      });
      console.log('Created new user from Twitter:', user.id);
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { twitterHandle: twitterUsername },
      });
      console.log('Updated user from Twitter:', user.id);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        twitterAccessToken: access_token,
        twitterRefreshToken: refresh_token,
      },
    });

    const appTokenPayload = { id: user.id, twitterHandle: user.twitterHandle };
    const appAccessToken = jwt.sign(appTokenPayload, JWT_SECRET, {
      expiresIn: '2h',
    });
    console.log(
      'Created JWT for user =>',
      user.id,
      ' token =>',
      appAccessToken
    );

    const redirectUrl = `${process.env.FRONTEND_URL}?loggedIn=true&accessToken=${appAccessToken}`;
    console.log('Redirecting back to =>', redirectUrl);
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error(
      'Error in twitterOAuth2Callback:',
      error.response?.data || error.message
    );
    next(createError(500, 'Twitter authentication failed'));
  }
};
