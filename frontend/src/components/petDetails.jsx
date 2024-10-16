import React, { useState } from 'react';
import PetColorPicker from './petColor';

const PetForm = ({ updatePetType, petType, selectedColor, setSelectedColor, setPetName }) => { // Add petType as a prop
  const [age, setAge] = useState('');
  const [snack, setSnack] = useState('');

  const handlePetTypeChange = (e) => {
    const selectedType = e.target.value;
    updatePetType(selectedType); // Call the function passed as prop
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Erstelle deinen Snuggle Buddy!</h2>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <label>Typ: </label>
        <select value={petType} onChange={handlePetTypeChange}> {/* Use petType prop here */}
          <option value="">--Wähle einen Typ--</option>
          <option value="dog">Hund</option>
          <option value="cat">Katze</option>
          <option value="bird">Vogel</option>
        </select>
      </div>

      <PetColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      
      <div>
        <label>Name: </label>
        <input
          type="text"
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Name: "
        />
      </div>

      <div>
        <label>Alter:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Alter: "
        />
      </div>

      <div>
        <label>Lieblingsessen:</label>
        <input
          type="text"
          value={snack}
          onChange={(e) => setSnack(e.target.value)}
          placeholder="Lieblingsessen: "
        />
      </div>
    </div>
  );
};

export default PetForm;
