import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [name, setName] = useState('');
  const { login, isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/notes" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    login();
  }

  return (
    <div className="home-content">
      <header className="home-header">
        <h1>Unlock notes</h1>
        <p className="home-subtitle">
          Demo login for protected routes. Enter any name and continue.
        </p>
      </header>

      <form className="simple-form" onSubmit={handleSubmit}>
        <label htmlFor="student-name">Your name</label>
        <input
          id="student-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Daksh"
        />
        <button type="submit" className="primary-btn">Go to notes</button>
      </form>
    </div>
  );
}
