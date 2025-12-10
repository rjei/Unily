const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');

// GET /api/users/me (Profil Sendiri)
router.get('/me', authenticate, userController.getMe);

// GET /api/users (Admin: List semua user)
// Tambahkan middleware isAdmin jika sudah buat, jika belum, authenticate saja cukup buat testing
router.get('/', authenticate, userController.getAllUsers); 
// GET /api/users/:userId (Detail User)
router.get('/:userId', authenticate, userController.getById);
// DELETE /api/users/:userId (Admin: Hapus User)
router.delete('/:userId', authenticate, userController.deleteUser);
// PUT /api/users/:userId (Admin: Edit User)
router.put('/:userId', authenticate, userController.updateUser);

module.exports = router;