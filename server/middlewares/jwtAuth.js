const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.requireJwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: 'No Authorization header provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Bearer token missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error =>', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
