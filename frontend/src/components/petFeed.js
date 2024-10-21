import React, { useState, useEffect } from 'react';

const VirtualPet = ({ hunger, setHunger, level, setLevel }) => {
  const [playTime, setPlayTime] = useState(0);
  const [showMessage, setShowMessage] = useState(false); // Update initial state

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(prevHunger => Math.max(prevHunger - 1, 0)); 
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setPlayTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (playTime >= 60) {
      setLevel(3);
    } else if (playTime >= 30) {
      setLevel(2);
    }
  }, [playTime]);

  useEffect(() => {
    if (level > 1) {
      setShowMessage(true);
      const messageTimeout = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(messageTimeout);
    }
  }, [level]);

  const food1 = () => {
    setHunger(prevHunger => Math.min(prevHunger + 5, 100)); 
  };
  const food2 = () => {
    setHunger(prevHunger => Math.min(prevHunger + 10, 100));
  };
  const food3 = () => {
    setHunger(prevHunger => Math.min(prevHunger + 15, 100));
  };

  return (
    <div className='pet-container'>
      {/* Hungerstatus und Fortschrittsbalken */}
      <h2 className="hunger-status">Hungerstatus</h2>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${hunger}%`,
            backgroundColor: hunger > 50 ? 'lightgreen' : 'lightcoral',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 0.5s ease-in-out',
          }}
        >
          <div className="percentage">{hunger}%</div>
        </div>
      </div>

      {/* Food-Buttons direkt unter dem Progress Bar */}
      <div className='food-buttons'>
        <button className='food-button1' onClick={food1} disabled={hunger === 100}>🥩</button>
        <button className='food-button2' onClick={food2} disabled={hunger === 100 || level < 2}>🍗</button>
        <button className='food-button3' onClick={food3} disabled={hunger === 100 || level < 3}>🍖</button>
      </div>

      {/* Zeige Nachricht, wenn Level 2 oder 3 erreicht wird */}
      {showMessage && (
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'darkgreen', borderRadius: '5px' }}>
                    🎉 Glückwunsch! Du hast Level {level} erreicht und somit ein neues Essen freigeschaltet! 🥳
                </div>
            )}
    </div>
  );
};

export default VirtualPet;

