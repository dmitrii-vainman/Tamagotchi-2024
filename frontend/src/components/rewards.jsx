// src/components/rewards.jsx
import React from 'react';
import './rewards.css'; // Ensure you create a separate CSS file for styling

const RewardShop = ({ currentCoins, setCoins, setBackground }) => {
  const items = [
    { id: 1, name: 'Background Gradient 1', cost: 75 },
    { id: 2, name: 'Background Gradient 2', cost: 75 },
    { id: 3, name: 'Background Gradient 3', cost: 75 },
    { id: 4, name: 'Background Gradient 4', cost: 75 },
    { id: 5, name: 'Background Gradient 5', cost: 75 },
    { id: 6, name: 'Background Gradient 6', cost: 75 },
    { id: 7, name: 'Background Gradient 7', cost: 75 },
    { id: 8, name: 'Background Gradient 8', cost: 75 },
  ];

  const handlePurchase = (cost) => {
    if (currentCoins >= cost) {
      setCoins(currentCoins - cost);
      alert(`You bought an item for ${cost} coins!`);
      // Here you can add functionality to change the background or whatever you need
    } else {
      alert("You don't have enough coins!");
    }
  };

  return (
    <div className="reward-shop">
      <h2>Reward Shop</h2>
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item">
            <h3>{item.name}</h3>
            <p>Cost: {item.cost} coins</p>
            <button style={{padding: ''}} onClick={() => handlePurchase(item.cost)}>Buy</button>
          </div>
        ))}
      </div>
      <p>Your Coins: {currentCoins}</p>
    </div>
  );
};

export default RewardShop;
