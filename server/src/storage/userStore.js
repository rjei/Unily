const fs = require('fs/promises');
const { usersFile } = require('../config');
const { ensureFile } = require('../utils/fileSystem');

const readUsers = async () => {
  await ensureFile(usersFile);
  const raw = await fs.readFile(usersFile, 'utf-8');
  if (!raw.trim()) {
    return [];
  }

  return JSON.parse(raw);
};

const writeUsers = async (users) => {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8');
};

const getAllUsers = async () => readUsers();

const findByEmail = async (email) => {
  const users = await readUsers();
  return users.find((user) => user.email === email.toLowerCase());
};

const addUser = async (user) => {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
};

module.exports = {
  getAllUsers,
  findByEmail,
  addUser,
};


