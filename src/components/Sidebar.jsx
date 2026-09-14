import { NavLink } from 'react-router-dom';
import { TOPICS } from '../data';
import { useProgress } from '../context/ProgressContext';
import ProgressRing from './ProgressRing';
import NavItem from './NavItem';
import WeatherWidget from './WeatherWidget';

export default function Sidebar({ isOpen, onNavigate }) {
  const { stats, resetAll } = useProgress();
  const percent = stats.totalQ ? Math.round((stats.solved / stats.totalQ) * 100) : 0;

  function handleReset() {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      resetAll();
    }
  }

  return (
    <aside id="sidebar" className={isOpen ? 'open' : ''}>
      <div className="sidebar-top">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <div>
            <div className="logo-title">DSA Tracker</div>
            <div className="logo-sub">Campus Placement Prep</div>
          </div>
        </div>
        <ProgressRing percent={percent} />
      </div>

      <nav className="topic-nav" onClick={onNavigate}>
        <NavLink to="/" end className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <span className="nav-icon">⌂</span>
          <span className="nav-label">
            <span className="nav-name">All topics</span>
            <span className="nav-meta">home</span>
          </span>
        </NavLink>
        {TOPICS.map((topic) => (
          <NavItem key={topic.id} topic={topic} />
        ))}
        <NavLink to="/notes" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <span className="nav-icon">✎</span>
          <span className="nav-label">
            <span className="nav-name">Prep notes</span>
            <span className="nav-meta">protected</span>
          </span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <WeatherWidget />
        <div className="quick-stats">
          <div className="qs-row"><span className="qs-dot solved-dot" /><span>{stats.solved} solved</span></div>
          <div className="qs-row"><span className="qs-dot attempted-dot" /><span>{stats.attempted} attempted</span></div>
          <div className="qs-row"><span className="qs-dot mastered-dot" /><span>{stats.mastered}/{TOPICS.length} topics mastered</span></div>
        </div>
        <button type="button" className="reset-all-btn" onClick={handleReset}>
          Reset all progress
        </button>
      </div>
    </aside>
  );
}
