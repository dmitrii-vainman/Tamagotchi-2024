// src/components/XPManager.jsx
import React, { useEffect } from 'react';

const XPManager = ({ level, setLevel, xp, setXp, increaseXp }) => {
  const xpThresholds = [30, 100, 200]; // Schwellenwerte für XP

  // Level-up basierend auf XP
  useEffect(() => {
    if (xp >= xpThresholds[level - 1]) {
      setLevel(prevLevel => Math.min(prevLevel + 1, xpThresholds.length)); // Max Level Cap
    }
  }, [xp, level, setLevel]);

  return null; 
};

export default XPManager;
