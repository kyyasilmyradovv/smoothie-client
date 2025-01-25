const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.serializeUser((user, done) => {
  console.log(
    'PASSPORT: serializeUser => storing user.id in session:',
    user.id
  );
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('PASSPORT: deserializeUser => got user.id from session:', id);
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      console.log('PASSPORT: deserializeUser => no user found in DB');
      return done(null, false);
    }
    console.log(
      'PASSPORT: deserializeUser => found user in DB =>',
      user.twitterHandle
    );
    done(null, user);
  } catch (err) {
    console.log('PASSPORT: deserializeUser => error:', err);
    done(err);
  }
});
