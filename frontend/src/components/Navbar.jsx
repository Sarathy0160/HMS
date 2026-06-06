import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="brand">Hotel Booking</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        {auth?.token ? (
          <>
            {auth.user.role === 'admin' ? (
              <>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/add-room">Add Room</Link>
                <Link to="/admin/manage-rooms">Rooms</Link>
                <Link to="/admin/manage-bookings">Bookings</Link>
              </>
            ) : (
              <>
                <Link to="/my-bookings">My Bookings</Link>
              </>
            )}
            <button type="button" className="btn-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
