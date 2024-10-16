import React, { useState } from 'react';

const PetColorPicker = ({ selectedColor, setSelectedColor }) => {

  const colors = ['#ed5345','#6bd694'];

  return (
    <div>
      <label>Wähle eine Variante: </label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', }}>
        {colors.map((color, index) => (
          <button
            key={color}
            style={{
              backgroundColor: color,
              border: selectedColor === color ? '3px solid black' : '2px solid grey',
              height: '30px',
              width: '30px',
              cursor: 'pointer',
              borderRadius: '30%',
            }}
            onClick={() => setSelectedColor(color)}
          >{index +1}</button>
        ))}
      </div>
    </div>
  );
};

export default PetColorPicker;
