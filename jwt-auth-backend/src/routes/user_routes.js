const express = require('express');
const router = express.Router();
const { getAllUsers, getStats, inviteUser, updateUserRole, updateUserStatus } = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth');
const checkRole = require('../middleware/role');

router.get('/users', verifyToken , checkRole("Admin"), getAllUsers);
router.get('/stats', verifyToken, checkRole("Admin"), getStats);
router.post('/users/invite', verifyToken, checkRole("Admin"), inviteUser);
router.patch('/users/:id/role', verifyToken, checkRole("Admin"), updateUserRole);
router.patch('/users/:id/status', verifyToken, checkRole("Admin"), updateUserStatus);

module.exports = router;