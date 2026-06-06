const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const allowedOrigins = FRONTEND_URL
  ? FRONTEND_URL.split(',').map((url) => url.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:4173'];

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is required in environment variables');
  process.exit(1);
}
if (!FRONTEND_URL) {
  console.warn('FRONTEND_URL is not set; using default local frontend origins for CORS.');
}

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS origin not allowed: ${origin}`));
    }
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Hotel Room Booking API is running' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });
