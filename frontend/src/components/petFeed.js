import React, { useState, useEffect } from 'react';
import './petFeed.css'

const VirtualPet = ({ hunger, setHunger, level, setLevel, token }) => {
  const [playTime, setPlayTime] = useState(0);
  const [showMessage, setShowMessage] = useState(false); // Update initial state

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(prevHunger => Math.max(prevHunger - 1, 0)); 
    }, 60000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setPlayTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    setLevel(prevLevel => {
      if (playTime >= 2700) { // 45min
        return Math.max(prevLevel, 3); // Höchstens Level 3
      } else if (playTime >= 900) { // 15min
        return Math.max(prevLevel, 2); // Höchstens Level 2
      }
      return prevLevel; // Wenn kein Level erhöht wird, zurückgeben
    });
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

  // Synchronisiere den Hungerwert in bestimmten Abständen mit dem Backend
  useEffect(() => {
    const syncHunger = setInterval(() => {
        fetch('http://snugglebuddys.de/feed-pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ hunger }) 
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) { 
                    console.error('Token ungültig oder abgelaufen, versuche es zu erneuern');
                }
                return response.json().then(data => {
                    throw new Error(data.error || 'Fehler beim Synchronisieren des Hungerwerts');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Hungerwert erfolgreich synchronisiert');
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Daten:', error);
        });
    }, 60000); 

    return () => clearInterval(syncHunger);
}, [hunger, token]); 


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
      <h2 className='h2-fe' style={{ textShadow: "1px 1px 2px black" }}>Sättigungsgefühl</h2>
      <div className="progress-bar" > 
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

      <div className='food-buttons'>
        <button className='food-button1' onClick={food1} disabled={hunger === 100}>🥩</button>
        <button className='food-button2' onClick={food2} disabled={hunger === 100 || level < 2}>🍗</button>
        <button className='food-button3' onClick={food3} disabled={hunger === 100 || level < 3}>🍖</button>
      </div>

      {showMessage && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px',
            backgroundColor: 'darkgreen',
            color: 'white',
            borderRadius: '5px',
            zIndex: 999,
          }}
        >
          🎉 Glückwunsch! Du hast ein neues Level erreicht! Lv: {level} 🥳
        </div>
      )}
    </div>
  );
};

export default VirtualPet;

