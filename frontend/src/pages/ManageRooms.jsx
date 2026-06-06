import { useEffect, useState } from 'react';
import API from '../utils/api.js';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/rooms');
      setRooms(response.data);
    } catch (err) {
      setError('Unable to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/rooms/${id}`);
      setRooms((prev) => prev.filter((room) => room._id !== id));
    } catch (err) {
      setError('Delete failed');
    }
  };

  const toggleAvailability = async (room) => {
    try {
      await API.put(`/rooms/${room._id}`, { available: !room.available });
      setRooms((prev) => prev.map((item) => (item._id === room._id ? { ...item, available: !item.available } : item)));
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <section className="page-content">
      <div className="section-header">
        <h2>Manage Rooms</h2>
      </div>
      {loading ? (
        <div>Loading rooms...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>${room.price}</td>
                  <td>{room.available ? 'Available' : 'Unavailable'}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => toggleAvailability(room)}>
                      Toggle Availability
                    </button>
                    <button className="btn-secondary" onClick={() => handleDelete(room._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageRooms;
