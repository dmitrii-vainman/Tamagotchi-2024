// src/components/PetImage.jsx
import React from 'react';

const PetImage = ({ petType }) => {
  const images = {
    dog: '../public/images/dog.png',
    cat: '../public/images/cat.png',
    snake: '../public/images/snake.png',
  };

  const petImageSrc = images[petType] || '../public/images/dog.png'; // Default image if petType is not recognized

  return (
    <div>
      <img src={petImageSrc} alt={petType || 'default pet'} style={{ width: '200px', height: 'auto' }} />
    </div>
  );
};

export default PetImage;
