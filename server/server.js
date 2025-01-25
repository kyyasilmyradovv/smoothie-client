// server/server.js

const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
// Load environment variables
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: path.resolve(__dirname, envFile) });
require('./passportConfig'); // Passport configuration moved to its own file

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none', // Allows cross-site in dev
      secure: false, // true only if you have HTTPS in dev
      maxAge: 24 * 60 * 60 * 1000, // optional: 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // or your React front-end URL
    credentials: true,
  })
);

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const referralRoutes = require('./routes/referralRoutes');

app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', referralRoutes);

// Start server
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
