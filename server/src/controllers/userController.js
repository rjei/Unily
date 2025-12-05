const userStore = require('../storage/userStore');

const sanitizeUser = (user) => {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return {
    id: rest.id,
    name: rest.name,
    email: rest.email,
    role: rest.role || 'pelanggan',
    createdAt: rest.createdAt,
  };
};

const getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const user = await userStore.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: sanitizeUser(user) });
};

const getById = async (req, res) => {
  const { userId } = req.params;
  const user = await userStore.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: sanitizeUser(user) });
};

const getAllUsers = async (req, res) => {
  const users = await userStore.getAllUsers();
  res.json({ users: users.map(sanitizeUser) });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const target = await userStore.findById(userId);
  if (!target) return res.status(404).json({ message: 'User not found' });
  if (target.role === 'admin') return res.status(403).json({ message: 'Cannot delete admin account' });
  const deleted = await userStore.deleteUser(userId);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted successfully', user: sanitizeUser(deleted) });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, role } = req.body;

  const target = await userStore.findById(userId);
  if (!target) return res.status(404).json({ message: 'User not found' });

  const allowedRoles = ['pelanggan', 'penjual'];
  if (typeof role !== 'undefined' && !allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Role can only be "pelanggan" or "penjual"' });
  }

  const updates = {};
  if (typeof name !== 'undefined') updates.name = name;
  if (typeof email !== 'undefined') updates.email = email;
  if (typeof role !== 'undefined') updates.role = role;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'No valid fields to update' });
  }

  const updated = await userStore.updateUser(userId, updates);
  if (!updated) return res.status(500).json({ message: 'Failed to update user' });
  res.json({ message: 'User updated successfully', user: sanitizeUser(updated) });
};

module.exports = {
  getMe,
  getById,
  getAllUsers,
  deleteUser,
  updateUser,
};
