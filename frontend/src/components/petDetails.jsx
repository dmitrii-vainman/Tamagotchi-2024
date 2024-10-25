import React, { useState } from 'react';
import PetColorPicker from './petColor';
import './petDetails.css';

const PetForm = ({ updatePetType, petType, selectedColor, setSelectedColor, setPetName }) => { 

  const handlePetTypeChange = (e) => {
    const selectedType = e.target.value;
    updatePetType(selectedType);
  };

  return (
    <div className="pet-form">
      <h2 className='h2-de'>Erstelle deinen Snuggle Buddy!</h2>

      <div className="form-group-typ">
        <label>Typ: </label>
        <select className="form-select" value={petType} onChange={handlePetTypeChange}>
          <option value="">--Wähle einen Typ--</option>
          <option value="dog">Hund</option>
          <option value="cat">Katze</option>
          <option value="bird">Vogel</option>
        </select>
      </div>

      <PetColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      <div className="form-group">
        <label>Name: </label>
        <input
          maxLength="20"
          type="text"
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Name: "
        />
      </div>
    </div>
  );
};

export default PetForm;
