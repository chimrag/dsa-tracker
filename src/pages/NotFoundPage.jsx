import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="home-content">
      <header className="home-header">
        <h1>404 — Page not found</h1>
        <p className="home-subtitle">That topic does not exist in your roadmap.</p>
        <Link to="/" className="back-btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
          ← Back to home
        </Link>
      </header>
    </div>
  );
}
