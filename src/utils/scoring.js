export function getQuestionStatus(state, topicId, qName) {
  return state[topicId]?.[qName] || 'none';
}

export function calcScore(topic, state) {
  let total = 0;
  let points = 0;

  topic.sections.forEach((section) => {
    section.questions.forEach((q) => {
      const weight = q.tag === 'hard' ? 3 : q.tag === 'medium' ? 2 : 1;
      const status = getQuestionStatus(state, topic.id, q.name);
      total += weight;
      if (status === 'solved') points += weight;
      else if (status === 'attempted') points += weight * 0.4;
    });
  });

  return total === 0 ? 0 : Math.round((points / total) * 100);
}

export function totalQuestions(topic) {
  return topic.sections.reduce((acc, section) => acc + section.questions.length, 0);
}

export function solvedCount(topic, state) {
  let count = 0;
  topic.sections.forEach((section) => {
    section.questions.forEach((q) => {
      if (getQuestionStatus(state, topic.id, q.name) === 'solved') count++;
    });
  });
  return count;
}

export function verdict(score) {
  if (score >= 80) {
    return {
      cls: 'v-ready',
      label: 'Ready to move on',
      msg: 'Strong command of this topic. Move forward — revisiting hard problems after covering more ground is far more effective than grinding the same concept.',
    };
  }
  if (score >= 50) {
    return {
      cls: 'v-almost',
      label: 'Getting there',
      msg: "Core mechanics are forming. Push through the unsolved mediums — those are the real interview staples. Don't let perfect block progress.",
    };
  }
  return {
    cls: 'v-notyet',
    label: 'Keep going',
    msg: 'Start with easy problems: read the concept hint, code it, then mark solved or attempted. Two problems a day with genuine understanding beats ten rushed ones.',
  };
}

export function overallStats(topics, state) {
  let totalQ = 0;
  let solved = 0;
  let attempted = 0;
  let mastered = 0;

  topics.forEach((topic) => {
    totalQ += totalQuestions(topic);
    topic.sections.forEach((section) => {
      section.questions.forEach((q) => {
        const status = getQuestionStatus(state, topic.id, q.name);
        if (status === 'solved') solved++;
        else if (status === 'attempted') attempted++;
      });
    });
    if (calcScore(topic, state) >= 80) mastered++;
  });

  return { totalQ, solved, attempted, mastered };
}
