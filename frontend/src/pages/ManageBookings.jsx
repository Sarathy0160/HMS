import { useEffect, useState } from 'react';
import API from '../utils/api.js';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Unable to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}`, { status });
      setBookings((prev) => prev.map((booking) => (booking._id === id ? { ...booking, status } : booking)));
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <section className="page-content">
      <div className="section-header">
        <h2>Manage Bookings</h2>
      </div>
      {loading ? (
        <div>Loading bookings...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.userId?.name || 'Guest'}</td>
                  <td>{booking.roomId?.roomType || 'Room'}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => handleStatus(booking._id, 'Confirmed')}>
                      Confirm
                    </button>
                    <button className="btn-secondary" onClick={() => handleStatus(booking._id, 'Cancelled')}>
                      Cancel
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

export default ManageBookings;
