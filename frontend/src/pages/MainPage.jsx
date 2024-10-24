import React, { useState, useEffect } from 'react';
import PetImage from '../components/petImage';
import AffectionMeter from '../components/affection';
import RewardShop from '../components/rewards';
import VirtualPet from '../components/petFeed';
import { Link, useNavigate } from 'react-router-dom';
import XPManager from '../components/XPManager';           
import { handleLogout } from '../components/ProtectedComponent';


const MainPage = ({ petType, selectedColor, petName, user }) => {
  const [hunger, setHunger] = useState(100);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(1000);
  const [xp, setXp] = useState(0);  // XP-State für Level-Up
  const [background, setBackground] = useState('/images/bg-1.png');
  const [isRewardShopOpen, setRewardShopOpen] = useState(false);
  const [affection, setAffection] = useState(0);

  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000'

  const toggleRewardShop = () => {
    setRewardShopOpen(!isRewardShopOpen);
  };

/*API_ENDPUNKT FETCH IST READY*/
useEffect(() => {
  const fetchData = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`${apiUrl}/${user.id}`);
        const data = await response.json();
        if (response.ok) {
          setHunger(data.hunger);
          setAffection(data.affection);
          setLevel(data.level);
          setXp(data.xp)
          setCoins(data.coins)
          setBackground(data.background)
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
  const fetchPetData = async () => {
    const token = localStorage.getItem('token'); // Holen des Tokens aus dem lokalen Speicher
    const response = await fetch(`${apiUrl}/my-pet`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      console.error('Fehler beim Abrufen der Haustierdaten');
      return;
    }
    const petData = await response.json();
    // Setze den Zustand mit den Haustierdaten
    setHunger(petData.hunger);
    setAffection(petData.affection);
    setLevel(petData.level);
    setXp(petData.xp);
    setCoins(petData.coins);
    setBackground(petData.background); // Falls du das Background in den Haustierdaten hast
  };

  fetchPetData();
}, [user]);

useEffect(() => {
  const saveData = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`${apiUrl}/${user.id}`, {
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
}, [hunger, affection, level, user, background, xp, coins]);

  return (
    <div className="app" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh' }}>
      <div className="level-status">
        <p>XP: {xp}</p>
        <p>Level: {level}</p>
        <p>Coins: {coins}</p>

        {/* NEU: Logout-Button mit Aufruf der handleLogout Funktion */} 
        <button 
          onClick={() => handleLogout(navigate)}  // NEU: Logout-Logik, history wird übergeben
          style={{ marginLeft: '20px', padding: '5px 10px' }}
        >
          Logout
        </button>
        </div>      
  
      <div className="hunger-container">
        <VirtualPet hunger={hunger} setHunger={setHunger} level={level} setLevel={setLevel} />
      </div>
  
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PetImage petType={petType} selectedColor={selectedColor} petName={petName} pageType="mainPage" />


        {/* XPManager-Component */}
        <XPManager level={level} setLevel={setLevel} xp={xp} setXp={setXp} />
  
        {/* AffectionMeter-Component */}
        <AffectionMeter 
          affection={affection} 
          setAffection={setAffection} 
          level={level} 
          setCoins={setCoins} 
          increaseXp={() => setXp(prevXp => prevXp + 10)} // XP-Erhöhung beim Klicken
        />
  
        <button onClick={toggleRewardShop} style={{ marginTop: '20px', marginBottom: '10px', padding: '10px 20px' }}>
          {isRewardShopOpen ? 'Close Shop' : 'Open Reward Shop'}
        </button>
  
        {isRewardShopOpen && (
          <div className="modal">
            <div className="modal-content">
              <RewardShop currentCoins={coins} setCoins={setCoins} setBackground={setBackground} />
            </div>
          </div>
        )}
      </div>
  
      <div className="impressum">
        <p style={{ textShadow: "1px 1px 2px black" }}><Link to="/impressum">Impressum für  {petName} </Link></p>
      </div>
    </div>
  );
  
};

export default MainPage;