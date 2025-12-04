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

module.exports = {
  getMe,
  getById,
};
