import { Link } from 'react-router-dom';
import { calcScore, solvedCount, totalQuestions } from '../utils/scoring';
import { useProgress } from '../context/ProgressContext';

export default function TopicCard({ topic }) {
  const { state } = useProgress();
  const score = calcScore(topic, state);
  const isMastered = score >= 80;
  const solved = solvedCount(topic, state);
  const total = totalQuestions(topic);
  const barColor = isMastered ? 'var(--c-green)' : score > 0 ? 'var(--c-amber)' : 'var(--c-border)';
  const pctColor = isMastered ? 'var(--c-green)' : score > 0 ? 'var(--c-amber)' : 'var(--c-text-muted)';

  return (
    <Link to={`/topic/${topic.id}`} className={`topic-card${isMastered ? ' card-mastered' : ''}`}>
      <div className="tc-top">
        <div className="tc-icon">{topic.icon}</div>
        <div className="tc-info">
          <div className="tc-name">{topic.name}</div>
          <div className="tc-meta">{total} problems</div>
        </div>
        {isMastered && <div className="tc-badge">Mastered</div>}
      </div>
      <div className="tc-bar-track">
        <div className="tc-bar-fill" style={{ width: `${score}%`, background: barColor }} />
      </div>
      <div className="tc-footer">
        <span className="tc-solved">{solved} solved</span>
        <span className="tc-pct" style={{ color: pctColor }}>{score}%</span>
      </div>
    </Link>
  );
}
