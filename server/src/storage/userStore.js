const pool = require('../db/db');

const getAllUsers = async () => {
  const result = await pool.query('SELECT id_users, nama, email, role, dibuat FROM users ORDER BY id_users DESC');
  return result.rows.map(row => ({
    id: row.id_users,
    name: row.nama,
    email: row.email,
    role: row.role || 'pelanggan',
    createdAt: row.dibuat,
  }));
};

const findByEmail = async (email) => {
  const result = await pool.query(
    'SELECT id_users, nama, email, password, role, dibuat FROM users WHERE lower(email) = $1',
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
    role: row.role || 'pelanggan',
    createdAt: row.dibuat,
  };
};

const findById = async (id) => {
  const result = await pool.query(
    'SELECT id_users, nama, email, password, role, dibuat FROM users WHERE id_users = $1',
    [id]
  );
  if (!result.rows[0]) return null;
  const row = result.rows[0];
  return {
    id: row.id_users,
    name: row.nama,
    email: row.email,
    passwordHash: row.password,
    role: row.role || 'pelanggan',
    createdAt: row.dibuat,
  };
};

const addUser = async (user) => {

  const createdDate = new Date().toISOString().split('T')[0];

  const result = await pool.query(
    'INSERT INTO users (nama, email, password, dibuat, role) VALUES ($1, $2, $3, $4, $5) RETURNING id_users, nama, email, role, dibuat',
    [user.name, user.email, user.passwordHash, createdDate, user.role || 'pelanggan']
  );

  const row = result.rows[0];
  return {
    id: row.id_users,
    name: row.nama,
    email: row.email,
    passwordHash: user.passwordHash,
    role: row.role || 'pelanggan',
    createdAt: row.dibuat,
  };
};

const updateRole = async (userId, newRole) => {
  const result = await pool.query(
    'UPDATE users SET role = $1 WHERE id_users = $2 RETURNING id_users, nama, email, role, dibuat',
    [newRole, userId]
  );
  if (!result.rows[0]) {
    return null;
  }
  const row = result.rows[0];
  return {
    id: row.id_users,
    name: row.nama,
    email: row.email,
    role: row.role,
    createdAt: row.dibuat,
  };
};

const deleteUser = async (userId) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id_users = $1 RETURNING id_users, nama, email, role, dibuat',
    [userId]
  );
  if (!result.rows[0]) {
    return null;
  }
  const row = result.rows[0];
  return {
    id: row.id_users,
    name: row.nama,
    email: row.email,
    role: row.role,
    createdAt: row.dibuat,
  };
};

const updateUser = async (userId, updates) => {
  const fields = [];
  const values = [];
  let idx = 1;

  if (typeof updates.name !== 'undefined') {
    fields.push(`nama = $${idx++}`);
    values.push(updates.name);
  }
  if (typeof updates.email !== 'undefined') {
    fields.push(`email = $${idx++}`);
    values.push(updates.email);
  }
  if (typeof updates.role !== 'undefined') {
    fields.push(`role = $${idx++}`);
    values.push(updates.role);
  }

  if (fields.length === 0) return null;

  values.push(userId);
  const query = `UPDATE users SET ${fields.join(', ')} WHERE id_users = $${idx} RETURNING id_users, nama, email, role, dibuat`;
  const result = await pool.query(query, values);
  if (!result.rows[0]) return null;
  const row = result.rows[0];
  return {
    id: row.id_users,
    name: row.nama,
    email: row.email,
    role: row.role,
    createdAt: row.dibuat,
  };
};

module.exports = {
  getAllUsers,
  findByEmail,
  addUser,
  updateRole,
  findById,
  deleteUser,
  updateUser,
};


