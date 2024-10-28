import React, { useEffect } from 'react';

const XPManager = ({ level, setLevel, xp, setXp, increaseXp }) => {
  const xpThresholds = [50, 150, 250]; // Schwellenwerte LvUP 

  // Level-up basierend auf XP
  useEffect(() => {
    if (xp >= xpThresholds[level - 1]) {
      setLevel(prevLevel => Math.min(prevLevel + 1, xpThresholds.length)); // Max Level Cap & aktuell 3 Coins pro 10XP
    }
  }, [xp, level, setLevel]);


  return (
    null
  );
};

export default XPManager;
