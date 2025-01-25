const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.processReferral = async (req, res) => {
  const { referralCode } = req.body;
  console.log('req.user:', req.user);
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (!referralCode) {
    return res.status(400).json({ error: 'No referral code provided' });
  }

  try {
    const referredUser = await prisma.user.findUnique({
      where: { referralCode },
    });
    if (!referredUser) {
      return res.status(400).json({ error: 'Invalid referral code' });
    }

    await prisma.user.update({
      where: { id: referredUser.id },
      data: { referralCount: referredUser.referralCount + 1 },
    });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
