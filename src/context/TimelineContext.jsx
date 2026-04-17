import { createContext, useContext, useState, useEffect } from 'react';

const TimelineContext = createContext(null);

export function TimelineProvider({ children }) {

  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('keenKeeperTimeline');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });


  useEffect(() => {
    localStorage.setItem('keenKeeperTimeline', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (type, friendName) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      date: today,
    };
    
    setEntries(prev => [newEntry, ...prev]);
  };

  const getInteractionCounts = () => {
    const counts = { call: 0, text: 0, video: 0 };
    entries.forEach(e => {
      if (counts[e.type] !== undefined) counts[e.type]++;
    });
    return counts;
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry, getInteractionCounts }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}