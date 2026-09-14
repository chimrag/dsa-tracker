import { NavLink } from 'react-router-dom';
import { calcScore, solvedCount, totalQuestions } from '../utils/scoring';
import { useProgress } from '../context/ProgressContext';

// Syllabus: props + conditional rendering
export default function NavItem({ topic }) {
  const { state } = useProgress();
  const score = calcScore(topic, state);
  const isMastered = score >= 80;
  const solved = solvedCount(topic, state);
  const total = totalQuestions(topic);

  return (
    <NavLink
      to={`/topic/${topic.id}`}
      className={({ isActive }) =>
        `nav-item${isActive ? ' active' : ''}${isMastered ? ' mastered' : ''}`
      }
    >
      <span className="nav-icon">{topic.icon}</span>
      <span className="nav-label">
        <span className="nav-name">{topic.name}</span>
        <span className="nav-meta">{solved}/{total} solved</span>
      </span>
      <span className={`nav-score ${isMastered ? 'score-green' : score > 0 ? 'score-amber' : ''}`}>
        {score > 0 ? `${score}%` : ''}
      </span>
      {isMastered && <span className="nav-check">✓</span>}
    </NavLink>
  );
}
