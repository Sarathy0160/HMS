import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api.js';
import Loading from '../components/Loading.jsx';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({ roomType: '', minPrice: '', maxPrice: '', available: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) query.set(key, value);
      });
      const response = await API.get(`/rooms?${query.toString()}`);
      setRooms(response.data);
    } catch (err) {
      setError('Unable to load room list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    loadRooms();
  };

  return (
    <section className="page-content">
      <div className="section-header">
        <h2>Available Rooms</h2>
      </div>

      <form className="filter-form" onSubmit={handleSearch}>
        <input name="roomType" value={filters.roomType} onChange={handleFilterChange} placeholder="Room type" />
        <input name="minPrice" type="number" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min price" />
        <input name="maxPrice" type="number" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max price" />
        <select name="available" value={filters.available} onChange={handleFilterChange}>
          <option value="">Availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <button className="btn-secondary" type="submit">Search</button>
      </form>

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
                <p>Capacity: {room.capacity}</p>
                <p>Status: {room.available ? 'Available' : 'Unavailable'}</p>
                <Link to={`/rooms/${room._id}`} className="btn-secondary">Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Rooms;
