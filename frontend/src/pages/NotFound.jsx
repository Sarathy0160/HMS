import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="page-content not-found-page">
    <h2>Page not found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className="btn-primary">Back to Home</Link>
  </section>
);

export default NotFound;
