import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../utils/api.js';
import Loading from '../components/Loading.jsx';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/rooms/${id}`)
      .then((response) => setRoom(response.data))
      .catch(() => setError('Unable to load room details'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <section className="page-content">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : room ? (
        <div className="detail-card">
          <img src={room.image} alt={room.roomType} />
          <div className="detail-body">
            <h2>{room.roomType}</h2>
            <p>{room.description}</p>
            <p>Room number: {room.roomNumber}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: ${room.price} per night</p>
            <p>Status: {room.available ? 'Available' : 'Unavailable'}</p>
            <Link to={`/booking/${room._id}`} className="btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="error-message">Room not found</div>
      )}
    </section>
  );
};

export default RoomDetails;
