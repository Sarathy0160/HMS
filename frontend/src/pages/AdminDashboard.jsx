import { useEffect, useState } from 'react';
import API from '../utils/api.js';
import Loading from '../components/Loading.jsx';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ rooms: 0, bookings: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const bookings = await API.get('/bookings');
        const users = await API.get('/users');
        const rooms = await API.get('/rooms');
        setStats({ rooms: rooms.data.length, bookings: bookings.data.length, users: users.data.length });
      } catch (err) {
        setError('Unable to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <section className="page-content">
      <div className="section-header">
        <h2>Admin Dashboard</h2>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Rooms</h3>
            <p>{stats.rooms}</p>
          </div>
          <div className="dashboard-card">
            <h3>Bookings</h3>
            <p>{stats.bookings}</p>
          </div>
          <div className="dashboard-card">
            <h3>Users</h3>
            <p>{stats.users}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
