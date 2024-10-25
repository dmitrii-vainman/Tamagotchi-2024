import React, { useState, useEffect } from 'react';
import './rewards.css';

const RewardShop = ({ currentCoins, setCoins, setBackground }) => {
  const initialItems = [
    { id: 1, name: 'town', cost: 0, owned: true },
    { id: 2, name: 'snow', cost: 30, owned: false },
    { id: 3, name: 'beach', cost: 30, owned: false },
    { id: 4, name: 'cafe', cost: 30, owned: false },
    { id: 5, name: 'DLC', cost: 9999, owned: false },
  ];

  // Retrieve owned status from local storage or initialize with default items
  const [items, setItems] = useState(() => {
    const savedItems = JSON.parse(localStorage.getItem('ownedItems'));
    return savedItems || initialItems;
  });

  // Save items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('ownedItems', JSON.stringify(items));
  }, [items]);

  const handlePurchaseOrSelect = (item) => {
    if (!item.owned && currentCoins >= item.cost) {
      setCoins(currentCoins - item.cost);
      setItems(items.map(i => i.id === item.id ? { ...i, owned: true } : i));
      alert(`You bought ${item.name} for ${item.cost} coins!`);
    } else if (!item.owned) {
      alert("You don't have enough coins!");
    }
    setBackground(`/images/bg-${item.id}.png`);
  };

  return (
    <div className="reward-shop">
      <h2 className="h2-re">Reward Shop</h2>
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item">
            <h3>{item.name}</h3>
            <p>Cost: {item.owned ? 'Owned' : `${item.cost} coins`}</p>
            <button 
              onClick={() => handlePurchaseOrSelect(item)}
              disabled={!item.owned && currentCoins < item.cost}
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
