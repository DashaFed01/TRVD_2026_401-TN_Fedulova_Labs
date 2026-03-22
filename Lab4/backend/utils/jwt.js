const jwt = require('jsonwebtoken');

const SECRET_KEY = 'lab4_super_secret_key';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: '30m' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  generateToken,
  verifyToken
};