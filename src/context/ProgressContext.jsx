import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TOPICS } from '../data';
import { overallStats } from '../utils/scoring';

const ProgressContext = createContext(null);

// Lifts tracker state up so Sidebar, Home, and Topic pages all share it
export function ProgressProvider({ children }) {
  const [state, setState] = useLocalStorage('dsa_tracker_v2', {});

  const getStatus = useCallback(
    (topicId, qName) => state[topicId]?.[qName] || 'none',
    [state]
  );

  const setStatus = useCallback((topicId, qName, next) => {
    setState((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], [qName]: next },
    }));
  }, [setState]);

  const resetAll = useCallback(() => {
    setState({});
  }, [setState]);

  const stats = useMemo(() => overallStats(TOPICS, state), [state]);

  const value = useMemo(
    () => ({ state, getStatus, setStatus, resetAll, stats }),
    [state, getStatus, setStatus, resetAll, stats]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
