const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('API: /api/user => we see req.user =>', req.user);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found in DB' });
    }

    const rank = await prisma.user.count({
      where: {
        referralCount: { gt: user.referralCount },
      },
    });

    return res.json({
      ...user,
      rank: rank + 1,
    });
  } catch (err) {
    console.error('Error in getUserData =>', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.joinWaitlist = async (req, res) => {
  const { email } = req.body;
  console.log('joinWaitlist => email =>', email);
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          referralCode: generateReferralCode(),
        },
      });
      console.log('joinWaitlist => new user created =>', user.id);
    }
    return res.json({ user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function generateReferralCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 8 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}
