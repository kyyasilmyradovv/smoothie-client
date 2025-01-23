// server.js
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Load environment variables
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: path.resolve(__dirname, envFile) });
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'YOUR_SESSION_SECRET_HERE',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:5174', // or your React front-end URL
    credentials: true,
  })
);

/**
 * Passport serialization:
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/**
 * Twitter (X) strategy
 * Make sure you have added your Twitter developer credentials in .env:
 *   TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET
 * Callback URL must match what you configured in your Twitter dev portal.
 */
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY || 'YOUR_TWITTER_KEY',
      consumerSecret:
        process.env.TWITTER_CONSUMER_SECRET || 'YOUR_TWITTER_SECRET',
      callbackURL: 'http://localhost:4004/auth/twitter/callback', // adjust as needed
    },
    async (token, tokenSecret, profile, done) => {
      // profile contains e.g. profile.username
      // Find or create user in DB
      try {
        let user = await prisma.user.findUnique({
          where: { twitterHandle: profile.username },
        });
        if (!user) {
          // If user is not in DB, create them with a new referral code
          user = await prisma.user.create({
            data: {
              twitterHandle: profile.username,
              referralCode: generateReferralCode(),
            },
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/** Utility function to generate referral code, adjust logic as you see fit */
function generateReferralCode() {
  // for example, a random 8-char code
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Route to start Twitter auth flow:
 */
app.get('/auth/twitter', passport.authenticate('twitter'));

/**
 * Callback route from Twitter:
 */
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: 'http://localhost:3000?error=twitterAuth', // or handle on front-end
  }),
  (req, res) => {
    // Successfully authenticated
    // Redirect back to front-end, or maybe pass along user info
    res.redirect('http://localhost:3000?loggedIn=true');
  }
);

/**
 * 1) Insert email waitlist
 */
app.post('/api/join', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // If user with that email already exists, just return them
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Create user
      user = await prisma.user.create({
        data: {
          email,
          referralCode: generateReferralCode(),
        },
      });
    }
    return res.json({ user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * 2) After user is back from X, get the user data (including referral code, referral count, rank, etc.)
 */
app.get('/api/user', async (req, res) => {
  // If using session-based auth via Passport, you can check req.user
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // calculate user rank by counting how many have referralCount greater
    const rank = await prisma.user.count({
      where: {
        referralCount: {
          gt: user.referralCount,
        },
      },
    });

    return res.json({
      ...user,
      rank: rank + 1, // if 20 people are above, rank is 21
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * 3) Accept a referral code from the user. If valid, increment referralCount
 */
app.post('/api/referral', async (req, res) => {
  const { referralCode } = req.body;
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (!referralCode) {
    return res.status(400).json({ error: 'No referral code provided' });
  }

  try {
    // Find user whose referralCode is referralCode
    const referredUser = await prisma.user.findUnique({
      where: { referralCode },
    });
    if (!referredUser) {
      return res.status(400).json({ error: 'Invalid referral code' });
    }
    // Increment their referralCount
    await prisma.user.update({
      where: { id: referredUser.id },
      data: { referralCount: referredUser.referralCount + 1 },
    });

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Example: user triggers "Follow smoothie on X" – you can’t directly confirm
 * server-side that they've followed, but you can note that they 'clicked' follow, or
 * in some flows, re-check user data from Twitter if they've indeed followed.
 * For simplicity, just a placeholder route:
 */
app.post('/api/follow', (req, res) => {
  // Possibly record in DB that user followed
  // or rely on the front-end to direct them to Twitter
  return res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
