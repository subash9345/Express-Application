const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    req.userId = decoded.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
};
