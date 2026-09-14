import { useProgress } from '../context/ProgressContext';

export default function QuestionCard({ topicId, question, cardKey, isOpen, onToggle }) {
  const { getStatus, setStatus } = useProgress();
  const status = getStatus(topicId, question.name);
  const link = question.link || question.leetcode;
  const linkLabel = question.linkLabel || 'LeetCode ↗';

  function mark(value, event) {
    event.stopPropagation();
    setStatus(topicId, question.name, value);
  }

  return (
    <div className={`q-card ${status}`} onClick={onToggle}>
      <div className="q-row">
        <div className={`q-dot ${status}`} />
        <div className="q-name">{question.name}</div>
        <span className={`q-tag t-${question.tag}`}>{question.tag}</span>
        <span className={`q-chevron ${isOpen ? 'open' : ''}`}>›</span>
      </div>
      <div className={`q-body ${isOpen ? 'open' : ''}`}>
        <div className="q-concept">{question.concept}</div>
        <div className="q-actions">
          <button
            type="button"
            className={`qa-btn qa-solve ${status === 'solved' ? 'active' : ''}`}
            onClick={(e) => mark('solved', e)}
          >
            Mark solved
          </button>
          <button
            type="button"
            className={`qa-btn qa-attempt ${status === 'attempted' ? 'active' : ''}`}
            onClick={(e) => mark('attempted', e)}
          >
            Attempted
          </button>
          <button type="button" className="qa-btn qa-reset" onClick={(e) => mark('none', e)}>
            Reset
          </button>
          {link && (
            <a
              className="qa-btn qa-lc"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {linkLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
