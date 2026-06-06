const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { getUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);

module.exports = router;
