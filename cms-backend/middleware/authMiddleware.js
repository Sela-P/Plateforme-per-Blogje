const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.startsWith('Bearer ') 
  ? authHeader.split(' ')[1] 
  : authHeader;
  
  if (!token) {
    return res.status(401).json({ message: 'Nuk je i autorizuar' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token i pavlefshëm' });
  }
};

module.exports = verifyToken;