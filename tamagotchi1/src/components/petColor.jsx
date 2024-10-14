import React, { useState } from 'react';

const PetColorPicker = ({ selectedColor, setSelectedColor }) => {

  const colors = ['#ff0000', '#00ff00', '#0000ff'];

  return (
    <div>
      <label>Wähle eine Farbe: </label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', }}>
        {colors.map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: color,
              border: selectedColor === color ? '3px solid black' : '2px solid grey',
              height: '50px',
              width: '50px',
              cursor: 'pointer',
              borderRadius: '50%',
            }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default PetColorPicker;
