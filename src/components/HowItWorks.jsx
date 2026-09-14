// Syllabus: component composition — small reusable UI blocks
function HintCard({ icon, bg, color, children }) {
  return (
    <div className="hiw-card">
      <div className="hiw-icon" style={{ background: bg, color }}>{icon}</div>
      <div>{children}</div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="how-it-works">
      <div className="hiw-title">How readiness works</div>
      <div className="hiw-cards">
        <HintCard icon="✓" bg="var(--c-green-bg)" color="var(--c-green)">
          <strong>Solved</strong> = full weight
        </HintCard>
        <HintCard icon="~" bg="var(--c-amber-bg)" color="var(--c-amber)">
          <strong>Attempted</strong> = 40% weight
        </HintCard>
        <HintCard icon="!" bg="var(--c-red-bg)" color="var(--c-red)">
          Hard problems = 3× weight
        </HintCard>
        <HintCard icon="80" bg="var(--c-blue-bg)" color="var(--c-blue)">
          <strong>80%+</strong> = move on
        </HintCard>
      </div>
    </div>
  );
}
