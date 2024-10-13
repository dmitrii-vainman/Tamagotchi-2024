import React, { useState } from 'react';

const PetForm = ({ updatePetType, petType }) => { // Add petType as a prop
  const [petName, setPetName] = useState('');
  const [age, setAge] = useState('');
  const [snack, setSnack] = useState('');

  const handlePetTypeChange = (e) => {
    const selectedType = e.target.value;
    updatePetType(selectedType); // Call the function passed as prop
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Erstelle deinen Begleiter!</h2>

      <div>
        <label>Typ: </label>
        <select value={petType} onChange={handlePetTypeChange}> {/* Use petType prop here */}
          <option value="">--Wähle einen Typ--</option>
          <option value="dog">Hund</option>
          <option value="cat">Katze</option>
          <option value="snake">Schlange</option>
        </select>
      </div>

      <div>
        <label>Name: </label>
        <input
          type="text"
          value={petName}
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
