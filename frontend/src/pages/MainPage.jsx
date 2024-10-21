import React, { useState, useEffect } from 'react';
import PetImage from '../components/petImage';
import AffectionMeter from '../components/affection';
import RewardShop from '../components/rewards';
import VirtualPet from '../components/petFeed';
import { Link } from 'react-router-dom';
import XPManager from '../components/XPManager';

const MainPage = ({ petType, selectedColor, petName }) => {
  const [hunger, setHunger] = useState(100);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);  // XP-State für Level-Up
  const [background, setBackground] = useState('#121212');
  const [isRewardShopOpen, setRewardShopOpen] = useState(false);
  

  const toggleRewardShop = () => {
    setRewardShopOpen(!isRewardShopOpen);
  };

  return (
    <div className="app">
      <div className="level-status">
        <p>XP: {xp}</p>
        <p>Level: {level}</p>
        <p>Coins: {coins}</p>
      </div>

      <div className="hunger-container">
        <VirtualPet hunger={hunger} setHunger={setHunger} level={level} setLevel={setLevel} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PetImage petType={petType} selectedColor={selectedColor} petName={petName} />

        {/* XPManager-Component */}
        <XPManager level={level} setLevel={setLevel} xp={xp} setXp={setXp} />

        {/* AffectionMeter-Component */}
        <AffectionMeter 
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
        <p><Link to="/impressum">Impressum</Link></p>
      </div>
    </div>
  );
};

export default MainPage;