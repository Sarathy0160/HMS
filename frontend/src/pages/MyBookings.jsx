import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import API from '../utils/api.js';
import Loading from '../components/Loading.jsx';

const MyBookings = () => {
  const { auth } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.user) return;
    API.get(`/bookings/user/${auth.user.id}`)
      .then((response) => setBookings(response.data))
      .catch(() => setError('Unable to load bookings'))
      .finally(() => setLoading(false));
  }, [auth.user]);

  if (loading) return <Loading />;

  return (
    <section className="page-content">
      <div className="section-header">
        <h2>My Bookings</h2>
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.roomId?.roomType || 'Room'}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td>${booking.totalPrice}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyBookings;
