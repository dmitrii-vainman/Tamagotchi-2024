import React, { useState } from 'react';
import './rewards.css'; // Ensure you create a separate CSS file for styling

const RewardShop = ({ currentCoins, setCoins, setBackground }) => {
  // Define items with initial owned status
  const initialItems = [
    { id: 1, name: 'town', cost: 0, owned: true }, // Default is owned initially
    { id: 2, name: 'snow', cost: 30, owned: false },
    { id: 3, name: 'beach', cost: 30, owned: false },
    { id: 4, name: 'cafe', cost: 30, owned: false },
    { id: 5, name: 'test', cost: 100, owned: false },
  ];

  const [items, setItems] = useState(initialItems);

  const handlePurchaseOrSelect = (item) => {
    if (!item.owned) {
      if (currentCoins >= item.cost) {
        // Deduct coins and set the item as owned
        setCoins(currentCoins - item.cost);
        setItems(items.map(i => 
          i.id === item.id ? { ...i, owned: true } : i
        ));
        alert(`You bought ${item.name} for ${item.cost} coins!`);
      } else {
        // Alert if not enough coins
        alert("You don't have enough coins!");
      }
    }
    // Set background whether it's newly purchased or already owned
    setBackground(`/images/bg-${item.id}.png`);
  };

  return (
    <div className="reward-shop">
      <h2>Reward Shop</h2>
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item">
            <h3>{item.name}</h3>
            <p>Cost: {item.owned ? 'Owned' : `${item.cost} coins`}</p>
            <button 
              onClick={() => handlePurchaseOrSelect(item)}
              disabled={!item.owned && currentCoins < item.cost} // Disable if not enough coins
            >
              {item.owned ? 'Select' : 'Buy'}
            </button>
          </div>
        ))}
      </div>
      <p>Your Coins: {currentCoins}</p>
    </div>
  );
};

export default RewardShop;
