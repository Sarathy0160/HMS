import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api.js';
import { AuthContext } from '../context/AuthContext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', adminCode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/auth/register', form);
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="form-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label>Admin registration code (optional)</label>
          <input type="text" name="adminCode" value={form.adminCode} onChange={handleChange} />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
