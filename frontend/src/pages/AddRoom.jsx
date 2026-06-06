import { useState } from 'react';
import API from '../utils/api.js';

const AddRoom = () => {
  const [form, setForm] = useState({ roomNumber: '', roomType: '', price: '', description: '', capacity: '', image: '', available: true });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      await API.post('/rooms', { ...form, price: Number(form.price), capacity: Number(form.capacity) });
      setMessage('Room added successfully');
      setForm({ roomNumber: '', roomType: '', price: '', description: '', capacity: '', image: '', available: true });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add room');
    }
  };

  return (
    <section className="page-content">
      <div className="form-card">
        <h2>Add Room</h2>
        <form onSubmit={handleSubmit}>
          <label>Room Number</label>
          <input name="roomNumber" value={form.roomNumber} onChange={handleChange} required />
          <label>Room Type</label>
          <input name="roomType" value={form.roomType} onChange={handleChange} required />
          <label>Price per night</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required />
          <label>Capacity</label>
          <input name="capacity" type="number" value={form.capacity} onChange={handleChange} required />
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
          <label>Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} />
          <label className="checkbox-label">
            <input name="available" type="checkbox" checked={form.available} onChange={handleChange} />
            Available now
          </label>
          {message && <div className="success-message">{message}</div>}
          <button type="submit" className="btn-primary">Save Room</button>
        </form>
      </div>
    </section>
  );
};

export default AddRoom;
