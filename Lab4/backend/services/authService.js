const bcrypt = require('bcryptjs');
const usersRepository = require('../data/usersRepository');
const UserDTO = require('../dto/userDto');
const { generateToken } = require('../utils/jwt');

async function register(userData) {
  const existingUser = usersRepository.findByEmail(userData.email);

  if (existingUser) {
    return {
      error: 'User with this email already exists'
    };
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = usersRepository.create({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'user'
  });

  return {
    user: new UserDTO(newUser)
  };
}

async function login(email, password) {
  const user = usersRepository.findByEmail(email);

  if (!user) {
    return {
      error: 'Invalid email or password'
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password'
    };
  }

  const token = generateToken(user);

  return {
    token,
    user: new UserDTO(user)
  };
}

function getProfile(userId) {
  const user = usersRepository.findById(userId);

  if (!user) {
    return null;
  }

  return new UserDTO(user);
}

module.exports = {
  register,
  login,
  getProfile
};