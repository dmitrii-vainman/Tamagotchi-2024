import React, { useState } from 'react';
import './affection.css'

const AffectionMeter = ({ level, setCoins, increaseXp, affection, setAffection }) => {
 

  const increaseAffection = () => {
    if (affection >= 10) {
      setAffection(0); // Reset affection
      setCoins(prevCoins => prevCoins + (level*3)); // Reward coins based on the current level
      increaseXp(); // Call the increaseXp function to increase XP
    } else {
      setAffection(prevAffection => Math.min(prevAffection + 1, 10)); // Max affection level
    }
  };

  return (
    <div className="affection-container">
      <h2 className='h2-af' style={{ textShadow: "1px 1px 2px black" }}>Gebe deinem Tier Zuneigung</h2>
      {/* Affection Bar */}
      <div style={{ marginTop: '20px', width: '300px', backgroundColor: '#ddd', height: '20px', borderRadius: '10px' }}>
        <div
          style={{
            width: `${affection * 10}%`,
            backgroundColor: affection === 10 ? 'lightcoral' : 'lightgreen',
            height: '100%',
            borderRadius: '10px'
          }}
        />
      </div>

      {/* Button to increase affection */}
      <button
        className="heart-button"
        onClick={increaseAffection}
        style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '50%' }}
      >
        ❤️
      </button>
    </div>
  );
};

export default AffectionMeter;
