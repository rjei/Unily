const db = require('../utils/db');


const mapRowToUser = (row) => {
  if (!row) return null;
  return {
    id: row.id_users ?? row.id,
    name: row.nama ?? row.name,
    email: row.email,
    passwordHash: row.password ?? row.password_hash ?? row.passwordHash,
    createdAt: row.dibuat ?? row.createdat ?? row.created_at,
  };
};

const getAllUsers = async () => {
  const { rows } = await db.query('SELECT id_users, nama, email, password, dibuat FROM users');
  return rows.map(mapRowToUser);
};

const findByEmail = async (email) => {
  const { rows } = await db.query(
    'SELECT id_users, nama, email, password, dibuat FROM users WHERE lower(email) = lower($1) LIMIT 1',
    [email],
  );
  return mapRowToUser(rows[0]);
};

const addUser = async ({ name, email, passwordHash }) => {

  const { rows } = await db.query(
    'INSERT INTO users (nama, email, password, dibuat) VALUES ($1, $2, $3, NOW()) RETURNING id_users, nama, email, password, dibuat',
    [name, email, passwordHash],
  );
  return mapRowToUser(rows[0]);
};

module.exports = {
  getAllUsers,
  findByEmail,
  addUser,
};


