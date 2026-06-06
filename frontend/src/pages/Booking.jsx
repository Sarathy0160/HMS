import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api.js';
import Loading from '../components/Loading.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [dates, setDates] = useState({ checkInDate: '', checkOutDate: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/rooms/${id}`)
      .then((response) => setRoom(response.data))
      .catch(() => setMessage('Room details could not be loaded'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (event) => {
    setDates({ ...dates, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      await API.post('/bookings', { roomId: id, ...dates });
      navigate('/my-bookings');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="page-content">
      <div className="form-card">
        <h2>Book {room?.roomType}</h2>
        <form onSubmit={handleSubmit}>
          <label>Check-in Date</label>
          <input type="date" name="checkInDate" value={dates.checkInDate} onChange={handleChange} required />
          <label>Check-out Date</label>
          <input type="date" name="checkOutDate" value={dates.checkOutDate} onChange={handleChange} required />
          {message && <div className="error-message">{message}</div>}
          <button type="submit" className="btn-primary">Confirm Booking</button>
        </form>
        <button type="button" className="btn-secondary" onClick={() => navigate(`/rooms/${id}`)}>
          Back to room
        </button>
      </div>
    </section>
  );
};

export default Booking;
