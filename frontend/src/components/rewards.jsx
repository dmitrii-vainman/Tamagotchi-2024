// src/components/rewards.jsx
import React, { useState } from 'react';
import './rewards.css'; // Ensure you create a separate CSS file for styling

const RewardShop = ({ currentCoins, setCoins, setBackground }) => {
  // Define items with initial owned status
  const initialItems = [
    { id: 9, name: 'Default', cost: 0, owned: false },
    { id: 2, name: 'bg town', cost: 75, owned: false },
    { id: 3, name: 'bg beach', cost: 75, owned: false },
    { id: 4, name: 'bg snow', cost: 75, owned: false },
    { id: 5, name: 'bg cafe', cost: 75, owned: false },
    { id: 6, name: 'Background Gradient 5', cost: 75, owned: false },
    { id: 7, name: 'Background Gradient 6', cost: 75, owned: false },
    { id: 8, name: 'Background Gradient 7', cost: 75, owned: false },
  ];

  const [items, setItems] = useState(initialItems);

  const handlePurchase = (item) => {
    if (currentCoins >= item.cost) {
      // Deduct coins
      setCoins(currentCoins - item.cost);
      
      // Update the background image based on the item's ID
      const backgroundImage = `/images/bg-${item.id}.png`; // Make sure this path is correct
      setBackground(backgroundImage);
      
      // Update the item to indicate it is owned
      const updatedItems = items.map(i => 
        i.id === item.id ? { ...i, cost: 0, owned: true } : i
      );
      
      setItems(updatedItems); // Update the state with the new items array
  
      alert(`You bought ${item.name} for ${item.cost} coins!`);
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
            <p>Cost: {item.owned ? 0 : item.cost} coins</p>
            <button 
              onClick={() => handlePurchase(item)}
              disabled={item.owned} // Disable button if already owned
            >
              {item.owned ? 'Owned' : 'Buy'}
            </button>
          </div>
        ))}
      </div>
      <p>Your Coins: {currentCoins}</p>
    </div>
  );
};

export default RewardShop;
