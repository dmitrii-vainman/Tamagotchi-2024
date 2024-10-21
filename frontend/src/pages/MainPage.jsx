// src/pages/MainPage.jsx
import React, { useState } from 'react';
import PetImage from '../components/petImage';

import AffectionMeter from '../components/affection';
import RewardShop from '../components/rewards';
import VirtualPet from '../components/petFeed';
import { Link } from 'react-router-dom';


const MainPage = ({ petType, selectedColor, petName }) => {
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [background, setBackground] = useState('#806054');
  const [isRewardShopOpen, setRewardShopOpen] = useState(false);

  const toggleRewardShop = () => {
    setRewardShopOpen(!isRewardShopOpen);
  };

  return (

    <div style={{ background: background, minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PetImage petType={petType} selectedColor={selectedColor} petName={petName} backgroundColor="#ffeb3b" />


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
