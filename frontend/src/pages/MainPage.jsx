import React, { useEffect, useState } from 'react'; 
import PetImage from '../components/petImage';
import AffectionMeter from '../components/affection';
import RewardShop from '../components/rewards';
import VirtualPet from '../components/petFeed';
import { Link } from 'react-router-dom';


const MainPage = ({ petType, selectedColor, petName }) => {

  const [affection, setAffection] = useState(0);
  const [maxAffectionCount, setMaxAffectionCount] = useState(0); 
  const [colorA, setColorA] = useState('lightgreen');
  const [hunger, setHunger] = useState(100); 
  const [level, setLevel] = useState(1);

  const user = JSON.parse(localStorage.getItem('user'));

  const increaseAffection = () => {
    if (affection >= 10) {
      setAffection(0); 
      setMaxAffectionCount(maxAffectionCount + 1); 
      setColorA('lightgreen'); 
    } else {
      setAffection(affection + 1);
      if (affection + 1 === 10) {
        setColorA('lightcoral'); 
      }
    }

  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [background, setBackground] = useState('#806054');
  const [isRewardShopOpen, setRewardShopOpen] = useState(false);

  const toggleRewardShop = () => {
    setRewardShopOpen(!isRewardShopOpen);

  };

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`http://localhost:5000/${user.id}`);
          const data = await response.json();
          if (response.ok) {
            setHunger(data.hunger);
            setAffection(data.affection);
            setLevel(data.level);
          } else {
            console.error('Fehler beim Abrufen der Daten:', response.status);
          }
        } catch (error) {
          console.log('Fehler beim Abrufen der Daten:', error);
        }
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const saveData = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`http://localhost:5000/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ hunger, affection, level }),
          });

          if (!response.ok) {
            console.error('Fehler beim Speichern der Daten!');
          }
        } catch (error) {
          console.log('Fehler beim Speichern:', error);
        }
      }
    };
    saveData();
  }, [hunger, affection, level, user]);

  return (
<div className="app">
      {/* Level-Anzeige oben rechts */}
      <div className="level-status">Level: {level}</div>

      {/* Pet-Bild in der Mitte */}
      <PetImage petType={petType} selectedColor={selectedColor} petName={petName} />

      {/* Zeige die Nachricht unter dem Bild */}
      <div className='show-message'>
        {/* Hier kannst du die Show-Message Logik hinzufügen */}
      </div>

      {/* Zuneigungsanzeige unten rechts */}
      <div className="affection-container">
        <p>Zuneigungsstufe {maxAffectionCount}</p>

        {/* Affection bar */}
        <div style={{ width: '300px', backgroundColor: '#ddd', height: '20px', borderRadius: '10px', marginBottom: '10px' }}>
          <div
            style={{
              width: `${affection * 10}%`,
              backgroundColor: colorA,
              height: '100%',
              borderRadius: '10px',
            }}
          />
        </div>

        {/* Button to increase affection */}
        <button className="heart-button" onClick={increaseAffection}>
          ❤️
        </button>
      </div>

      {/* Hunger und Füttern unten links */}
      <div className="hunger-container">
        <VirtualPet hunger={hunger} setHunger={setHunger} level={level} setLevel={setLevel} />
      </div>

      {/* Impressum-Link */}
      <div class="impressum">
      <p><Link to="/impressum">Impressum</Link></p>
      </div>


    <div style={{ background: background, minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PetImage petType={petType} selectedColor={selectedColor} petName={petName} />


        {/* Affection Meter */}
        <AffectionMeter level={level} setLevel={setLevel} coins={coins} setCoins={setCoins} />

        {/* Button to open or close Reward Shop */}
        <button onClick={toggleRewardShop} style={{ marginTop: '20px',marginBottom: '10px', padding: '10px 20px' }}>
          {isRewardShopOpen ? 'Close Shop' : 'Open Reward Shop'}
        </button>

        {/* Reward Shop Modal */}
        {isRewardShopOpen && (
          <div className="modal">
            <div className="modal-content">
              <RewardShop currentCoins={coins} setCoins={setCoins} setBackground={setBackground} />
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default MainPage;
