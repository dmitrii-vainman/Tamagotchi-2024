import React, { useState } from 'react';
import PetImage from '../components/petImage';
import { Link } from 'react-router-dom';

const MainPage = ({ petType, selectedColor, petName }) => {
  const [affection, setAffection] = useState(0);
  const [maxAffectionCount, setMaxAffectionCount] = useState(0); // Track max affection reached
  const [colorA, setColorA] = useState('lightgreen');

  const increaseAffection = () => {
    if (affection >= 10) {
      setAffection(0); // Reset affection to 0
      setMaxAffectionCount(maxAffectionCount + 1); // Increase the count of times max affection is reached
      setColorA('lightgreen'); // Reset bar color
    } else {
      setAffection(affection + 1);
      if (affection + 1 === 10) {
        setColorA('lightcoral'); // Change bar color at max affection
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {/* Display the pet image in the middle */}
      <PetImage petType={petType} selectedColor={selectedColor} petName={petName} />

      {/* Affection bar */}
      <div style={{ marginTop: '20px', width: '300px', backgroundColor: '#ddd', height: '20px', borderRadius: '10px' }}>
        <div style={{
          width: `${affection * 10}%`, 
          backgroundColor: colorA, 
          height: '100%', 
          borderRadius: '10px'
        }} />
      </div>

      {/* Display max affection count */}
      <p style={{ marginTop: '10px' }}>Zuneigung: Level {maxAffectionCount}</p>

      {/* Button to increase affection */}
      <button 
        onClick={increaseAffection} 
        style={{
          marginTop: '20px', 
          padding: '10px 20px', 
          borderRadius: '50%', 
          backgroundColor: 'white', 
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        🌭🍏🍕
      </button>

      <p><Link to="/impressum">Impressum</Link></p>
    </div>
  );
};

export default MainPage;
