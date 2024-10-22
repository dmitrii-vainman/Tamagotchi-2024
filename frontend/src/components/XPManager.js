import React, { useEffect } from 'react';

const XPManager = ({ level, setLevel, xp, setXp, increaseXp }) => {
  const xpThresholds = [30, 100, 200]; // Schwellenwerte LvUP | Lv2 -> 30XP, Lv3 -> 100 XP, lv4 -> 200 XP

  // Level-up basierend auf XP
  useEffect(() => {
    if (xp >= xpThresholds[level - 1]) {
      setLevel(prevLevel => Math.min(prevLevel + 1, xpThresholds.length));//+1 -> 1 Lv up
    }
  }, [xp, level, setLevel]);


  return null;
};

export default XPManager;
