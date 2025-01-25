// server/controllers/authController.js

const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const crypto = require('crypto');
const axios = require('axios');
const { URLSearchParams } = require('url');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// 1) Start the OAuth flow
exports.twitterOAuth2Start = async (req, res, next) => {
  try {
    // Create PKCE codeVerifier and codeChallenge
    const codeVerifier = crypto.randomBytes(64).toString('hex');
    const codeChallenge = crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');

    // We'll store just {codeVerifier} in state to verify later
    const payload = {
      nonce: crypto.randomBytes(16).toString('hex'),
      codeVerifier,
    };
    const stateToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

    // IMPORTANT: use the same callback path that is actually defined in your routes
    // If your route is /api/auth/twitter/callback then do that here:
    const callbackURL = `${process.env.BACKEND_URL}/auth/twitter/callback`;

    // Build the Twitter auth URL
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.TWITTER_CLIENT_ID,
      redirect_uri: callbackURL,
      scope: 'tweet.read users.read offline.access', // or whatever scopes you need
      state: stateToken,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    // Redirect the user to Twitter to begin OAuth
    return res.redirect(
      `https://x.com/i/oauth2/authorize?${params.toString()}`
    );
  } catch (error) {
    console.error('Error in twitterOAuth2Start:', error);
    next(createError(500, 'Error initiating Twitter authentication'));
  }
};

// 2) Callback from Twitter
// server/controllers/authController.js

// ... existing code ...
exports.twitterOAuth2Callback = async (req, res, next) => {
  try {
    const { code, state } = req.query;
    if (!code || !state) {
      return next(createError(400, 'Missing code or state from Twitter'));
    }

    // Verify the state token
    let decoded;
    try {
      decoded = jwt.verify(state, JWT_SECRET);
    } catch (err) {
      console.error('Invalid or expired state token:', err);
      return next(createError(400, 'Invalid state token'));
    }

    const { codeVerifier } = decoded;
    if (!codeVerifier) {
      return next(createError(400, 'Missing codeVerifier in state payload'));
    }

    const callbackURL = `${process.env.BACKEND_URL}/auth/twitter/callback`;

    // Exchange the code for tokens
    const tokenUrl = 'https://api.twitter.com/2/oauth2/token';
    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.TWITTER_CLIENT_ID,
      redirect_uri: callbackURL,
      code_verifier: codeVerifier,
      code: code,
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

    // Fetch user info
    const userResponse = await axios.get('https://api.twitter.com/2/users/me', {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { 'user.fields': 'id,username,name' },
    });

    const twitterData = userResponse.data?.data;
    if (!twitterData?.id) {
      return next(createError(400, 'Failed to fetch Twitter user info'));
    }

    const twitterUsername = twitterData.username;

    // Upsert user
    let user = await prisma.user.findUnique({
      where: { twitterHandle: twitterUsername },
    });

    if (!user) {
      // create
      user = await prisma.user.create({
        data: {
          twitterHandle: twitterUsername,
          referralCode: crypto.randomBytes(4).toString('hex'),
        },
      });
      console.log('Created new user from Twitter:', user.id);
    } else {
      // update
      user = await prisma.user.update({
        where: { id: user.id },
        data: { twitterHandle: twitterUsername },
      });
      console.log('Updated user from Twitter:', user.id);
    }

    // Store tokens in DB if you want
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twitterAccessToken: access_token,
        twitterRefreshToken: refresh_token,
      },
    });

    // ******* Pass tokens via redirect query params *******
    // e.g. ?loggedIn=true&accessToken=xxx&refreshToken=yyy
    const redirectUrl =
      `${process.env.FRONTEND_URL}/?loggedIn=true` +
      `&accessToken=${encodeURIComponent(access_token)}` +
      `&refreshToken=${encodeURIComponent(refresh_token)}`;

    return res.redirect(redirectUrl);
  } catch (error) {
    console.error(
      'Error in twitterOAuth2Callback:',
      error.response?.data || error.message
    );
    next(createError(500, 'Twitter authentication failed'));
  }
};
