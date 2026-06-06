const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { createBooking, getUserBookings, getAllBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/user/:userId', authMiddleware, getUserBookings);
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.put('/:id', authMiddleware, adminMiddleware, updateBooking);
router.delete('/:id', authMiddleware, deleteBooking);

module.exports = router;
