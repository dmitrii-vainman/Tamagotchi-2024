import React, { useState, useEffect } from 'react';
import PetImage from '../components/petImage';
import AffectionMeter from '../components/affection';
import RewardShop from '../components/rewards';
import VirtualPet from '../components/petFeed';
import { Link, useNavigate } from 'react-router-dom';
import XPManager from '../components/XPManager';
import { handleLogout } from '../components/ProtectedComponent';

const MainPage = ({ user }) => {
  const [hunger, setHunger] = useState(100);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);  // XP for level-up
  const [background, setBackground] = useState('/images/bg-1.png');
  const [isRewardShopOpen, setRewardShopOpen] = useState(false);
  const [affection, setAffection] = useState(0);
  const [petName, setPetName] = useState(''); // Dynamic petName from API
  const [petType, setPetType] = useState(''); // Optional: Fetching petType as well
  const [selectedColor, setSelectedColor] = useState(''); // Optional

  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000'


  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the auth token if needed
        const response = await fetch(`${apiUrl}/my-pet`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Authorization header if required
          },
        });

        if (response.ok) {
          const petData = await response.json();
          // Update state with fetched data
          setPetName(petData.petname); // Assuming petname is returned by the API
          setPetType(petData.type); // Assuming petType is returned by the API
          setSelectedColor(petData.species); // Assuming selectedColor is returned by the API
        } else {
          console.error('Failed to fetch pet data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };

    fetchPetData();
  }, [user]); // Re-run this effect if `user` changes


  const toggleRewardShop = () => {
    setRewardShopOpen(!isRewardShopOpen);
  };


  // Fetch data on mount (including pet data)
  useEffect(() => {
    const fetchPetData = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`${apiUrl}/get-pet`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.ok) {
            console.error('Error fetching pet data:', response.status);
            return;
          }
          setHunger(petData.hunger);
          setAffection(petData.affection);
          setLevel(petData.level);
          setXp(petData.xp);
          setCoins(petData.coins);
          setBackground(petData.background); // Update background if it's part of the data
        } catch (error) {
          console.log('Error fetching pet data:', error);
        }
      }
    };

    fetchPetData();
  }, [user]);

  // Sync data changes (save to the backend)
  useEffect(() => {
    const saveData = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`${apiUrl}/update-pet/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              hunger,
              affection,
              level,
              xp,
              coins,
              background,
            }),
          });

          if (!response.ok) {
            console.error('Error saving pet data:', response.status);
          }
        } catch (error) {
          console.log('Error saving pet data:', error);
        }
      }
    };

    saveData();
  }, [hunger, affection, level, user, xp, coins, background]);

  return (
    <div className="app" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh' }}>
      <div className="level-status" stlye={{}}>
        <p>XP: {xp}</p>
        <p>Level: {level}</p>
        <p>Coins: {coins}</p>


        {/* Logout Button */}
        <button 
          onClick={() => handleLogout(navigate)}  // Call handleLogout with navigate
          style={{ margin: '10px 10px', padding: '5px 10px' }}
        >
          Logout
        </button>
      </div>

      <div className="hunger-container">
        <VirtualPet hunger={hunger} setHunger={setHunger} level={level} setLevel={setLevel} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Pet Image */}
        <PetImage petType={petType} selectedColor={selectedColor} petName={petName} pageType="mainPage" />

        {/* XP Manager Component */}
        <XPManager level={level} setLevel={setLevel} xp={xp} setXp={setXp} />

        {/* Affection Meter Component */}
        <AffectionMeter 
          petName={petName}
          affection={affection} 
          setAffection={setAffection} 
          level={level} 
          setCoins={setCoins} 
          increaseXp={() => setXp(prevXp => prevXp + 10)} // Increase XP on affection increase
        />

        {/* Toggle Reward Shop */}
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
        <p style={{ textShadow: "1px 1px 2px black" }}><Link to="/impressum">Impressum</Link></p>
      </div>
    </div>
  );
};

export default MainPage;
