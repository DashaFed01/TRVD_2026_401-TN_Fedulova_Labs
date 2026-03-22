let users = [];

function findAll() {
  return users;
}

function findByEmail(email) {
  return users.find(user => user.email === email);
}

function findById(id) {
  return users.find(user => user.id === id);
}

function create(userData) {
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user'
  };

  users.push(newUser);
  return newUser;
}

module.exports = {
  findAll,
  findByEmail,
  findById,
  create
};