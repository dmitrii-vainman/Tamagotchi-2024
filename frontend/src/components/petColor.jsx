import React from 'react';
import './petColor.css'; // Create a CSS file for the color picker

const PetColorPicker = ({ selectedColor, setSelectedColor }) => {
  const colors = ['#ed5345', '#6bd694'];

  return (
    <div className="color-picker">
      <label className="label">Wähle eine Variante: </label>
      <div className="color-buttons">
        {colors.map((color, index) => (
          <button
            key={color}
            className={`color-button ${selectedColor === color ? 'selected' : ''}`}
            style={{
              backgroundColor: color,
            }}
            onClick={() => setSelectedColor(color)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PetColorPicker;
