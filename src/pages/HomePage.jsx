import { TOPICS } from '../data';
import { useProgress } from '../context/ProgressContext';
import HowItWorks from '../components/HowItWorks';
import TopicCard from '../components/TopicCard';

export default function HomePage() {
  const { stats } = useProgress();

  return (
    <div className="home-content">
      <header className="home-header">
        <div className="home-title-row">
          <h1>Your DSA Roadmap</h1>
          <p className="home-subtitle">Know exactly when you&apos;re ready to move on.</p>
        </div>
        <div className="hero-stats">
          <div className="hs-card">
            <div className="hs-num">{stats.solved}</div>
            <div className="hs-label">Problems solved</div>
          </div>
          <div className="hs-card">
            <div className="hs-num">{stats.mastered}</div>
            <div className="hs-label">Topics mastered</div>
          </div>
          <div className="hs-card">
            <div className="hs-num">{TOPICS.length - stats.mastered}</div>
            <div className="hs-label">Topics remaining</div>
          </div>
        </div>
      </header>

      <HowItWorks />

      <div className="topics-grid">
        {TOPICS.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
