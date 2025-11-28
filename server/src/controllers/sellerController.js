const userStore = require('../storage/userStore');

const createError = (statusCode, message, details) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
};

const becomeSeller = async (req, res) => {
  // req.user harus sudah ada dari authenticate middleware
  if (!req.user) {
    throw createError(401, 'Unauthorized: No user found');
  }

  const userId = req.user.id;

  // Check if user is already a seller
  if (req.user.role === 'penjual') {
    throw createError(400, 'User is already a seller');
  }

  const updatedUser = await userStore.updateRole(userId, 'penjual');
  if (!updatedUser) {
    throw createError(500, 'Failed to update user role');
  }

  res.status(200).json({
    message: 'Successfully became a seller',
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
    },
  });
};

module.exports = {
  becomeSeller,
};
