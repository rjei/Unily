const pool = require('../db/db');

const getAllUsers = async () => {
  const result = await pool.query('SELECT id_users, nama, email, dibuat FROM users ORDER BY id_users DESC');
  return result.rows.map(row => ({
    id: row.id_users,
    name: row.nama,
    email: row.email,
    createdAt: row.dibuat,
  }));
};

const findByEmail = async (email) => {
  const result = await pool.query(
    'SELECT id_users, nama, email, password, dibuat FROM users WHERE lower(email) = $1',
    [email.toLowerCase()]
  );
  if (!result.rows[0]) {
    return null;
  }
  const row = result.rows[0];
  return {
    id: row.id_users,
    name: row.nama,
    email: row.email,
    passwordHash: row.password,
    createdAt: row.dibuat,
  };
};

const addUser = async (user) => {

  const createdDate = new Date().toISOString().split('T')[0];

  const result = await pool.query(
    'INSERT INTO users (nama, email, password, dibuat) VALUES ($1, $2, $3, $4) RETURNING id_users, nama, email, dibuat',
    [user.name, user.email, user.passwordHash, createdDate]
  );

  const row = result.rows[0];
  return {
    id: row.id_users,
    name: row.nama,
    email: row.email,
    passwordHash: user.passwordHash,
    createdAt: row.dibuat,
  };
};

module.exports = {
  getAllUsers,
  findByEmail,
  addUser,
};


