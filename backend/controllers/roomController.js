const Room = require('../models/Room');

const getRooms = async (req, res) => {
  try {
    const { roomType, minPrice, maxPrice, available } = req.query;
    const filter = {};

    if (roomType) filter.roomType = { $regex: roomType, $options: 'i' };
    if (available === 'true' || available === 'false') filter.available = available === 'true';
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    const rooms = await Room.find(filter).sort({ price: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch room', error: error.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, price, description, capacity, image, available } = req.body;
    const existing = await Room.findOne({ roomNumber });
    if (existing) return res.status(400).json({ message: 'Room number already exists' });

    const room = new Room({ roomNumber, roomType, price, description, capacity, image, available });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update room', error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete room', error: error.message });
  }
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
