const authService = require('../services/authService');

async function register(req, res) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Name, email and password are required'
    });
  }

  const result = await authService.register({ name, email, password, role });

  if (result.error) {
    return res.status(400).json({
      error: result.error
    });
  }

  res.status(201).json(result);
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }

  const result = await authService.login(email, password);

  if (result.error) {
    return res.status(401).json({
      error: result.error
    });
  }

  res.json(result);
}

function getProfile(req, res) {
  const user = authService.getProfile(req.user.id);

  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }

  res.json(user);
}

module.exports = {
  register,
  login,
  getProfile
};