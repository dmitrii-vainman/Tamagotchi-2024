// src/components/AffectionMeter.jsx
import React, { useState } from 'react';

const AffectionMeter = ({ level, setLevel, coins, setCoins }) => {
  const [affection, setAffection] = useState(0);

  const increaseAffection = () => {
    if (affection >= 10) {
      setLevel(Math.min(level + 1, 10)); // Cap at level 10
      setAffection(0); // Reset affection
      setCoins(coins + level); // Reward coins based on the current level
    } else {
      setAffection(affection + 1);
    }
  };

  return (
    <div>
      {/* Affection Bar */}
      <div style={{ marginTop: '20px', width: '300px', backgroundColor: '#ddd', height: '20px', borderRadius: '10px' }}>
        <div style={{
          width: `${affection * 10}%`, 
          backgroundColor: affection === 10 ? 'lightcoral' : 'lightgreen', 
          height: '100%', 
          borderRadius: '10px'
        }} />
      </div>

      {/* Button to increase affection */}
      <button onClick={increaseAffection} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '50%' }}>
        🌭🍏🍕
      </button>

      <p>Level: {level}</p>
      <p>Coins: {coins}</p>
    </div>
  );
};

export default AffectionMeter;
