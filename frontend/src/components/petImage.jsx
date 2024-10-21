import React from 'react';
import './petImage.css'; // Import your CSS file for styling

const PetImage = ({ petType, selectedColor, petName, backgroundColor }) => {
  // Define images for each pet type and color
  const images = {
    dog: {
      '#ed5345': '/images/dog.png',
      '#6bd694': '/images/dog-2.png',
    },
    cat: {
      '#ed5345': '/images/cat.png',
      '#6bd694': '/images/cat-2.png',
    },
    bird: {
      '#ed5345': '/images/bird.png',
      '#6bd694': '/images/bird-2.png',
    },
  };

  const petImageSrc = images[petType]?.[selectedColor] || '/images/dog.png'; // Fallback if no match

  return (
    <div className="pet-image-container" style={{ backgroundColor: backgroundColor }}>
      <h2 className='petBuddy'>Test {petName}</h2>
      <img src={petImageSrc} alt={petType} className="pet-image" />
    </div>
  );
};

export default PetImage;
