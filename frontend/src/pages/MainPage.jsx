import React, { useState } from 'react';
import PetImage from '../components/petImage';
import VirtualPet from '../components/petFeed';
import { Link } from 'react-router-dom';

const MainPage = ({ petType, selectedColor, petName }) => {
  const [affection, setAffection] = useState(0);
  const [colorA, setColorA] = useState('lightgreen');
  const [hunger, setHunger] = useState(100);

  const increaseAffection = () => {
    if (affection >= 10) {
      setAffection(10);
      setColorA('lightcoral');
    } else {
      setAffection(affection + 1);
      if (affection + 1 >= 10) { // Since we're multiplying by 10 for the bar width, 10 * 10 = 100%
        setColorA('lightcoral');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {/* Display the pet image in the middle */}
      <PetImage petType={petType} selectedColor={selectedColor} petName={petName} />

      {/* Affection bar */}
      <div style={{ marginTop: '20px', width: '300px', backgroundColor: '#ddd', height: '20px', borderRadius: '10px' }}>
        <div
          style={{
            width: `${affection * 10}%`,
            backgroundColor: colorA,
            height: '100%',
            borderRadius: '10px'
          }}
        />
      </div>

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

      {/* Hunger Bar */}
      <div>
        <h2>Hungerstatus: {hunger}</h2>

        {/* Fortschrittsbalken */}
        <div className="progress-bar" style={{ width: '300px', backgroundColor: '#ddd', borderRadius: '10px', height: '20px' }}>
          <div
            className="progress"
            style={{
              width: `${hunger}%`,
              backgroundColor: hunger > 50 ? 'darkgreen' : 'lightcoral', // Color change depending on hunger level
              height: '100%',
              borderRadius: '10px',
              transition: 'width 0.5s ease-in-out'  
            }}
            aria-valuenow={hunger}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {hunger}%  {/* Hungeranzeige innerhalb des Balkens */}
          </div>
        </div>

        {/* VirtualPet-Komponente */}
        <VirtualPet hunger={hunger} setHunger={setHunger} />

        <p>
          <Link to="/impressum">Impressum</Link>
        </p>
      </div>
    </div>
  );
};

export default MainPage;
