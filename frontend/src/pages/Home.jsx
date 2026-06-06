import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api.js';
import Loading from '../components/Loading.jsx';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/rooms')
      .then((response) => setRooms(response.data.slice(0, 4)))
      .catch(() => setError('Unable to load rooms'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page-content">
      <div className="hero">
        <h1>Comfortable stays for every traveler</h1>
        <p>Find affordable rooms, book with confidence, and manage your trips online.</p>
        <Link to="/rooms" className="btn-primary">
          Browse Rooms
        </Link>
      </div>

      <div className="section-header">
        <h2>Featured Rooms</h2>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="card-grid">
          {rooms.map((room) => (
            <div className="card" key={room._id}>
              <img src={room.image} alt={room.roomType} />
              <div className="card-body">
                <h3>{room.roomType}</h3>
                <p>{room.description}</p>
                <p className="room-price">${room.price} / night</p>
                <Link to={`/rooms/${room._id}`} className="btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
