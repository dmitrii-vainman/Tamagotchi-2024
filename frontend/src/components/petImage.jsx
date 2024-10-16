import React from 'react';

const PetImage = ({ petType, selectedColor, petName }) => {
    // Define images for each pet type and color
    const images = {
      dog: {
        '#ed5345': '../public/images/dog.png',
        '#6bd694': '../public/images/dog-2.png',
  
      },
      cat: {
        '#ed5345': '../public/images/cat.png',
        '#6bd694': '../public/images/cat-2.png',
 
      },
      bird: {
        '#ed5345': '../public/images/bird.png',
        '#6bd694': '../public/images/bird-2.png',

      },
    };

    const petImageSrc = images[petType]?.[selectedColor] || '../public/images/dog.png'; // Fallback if no match

    return (
      <div>
        <h2>Dein Buddy{petName}</h2>
        <img src={petImageSrc} alt={petType} style={{ width: '300px', height: 'auto' }} />
      </div>
    );
};

export default PetImage;
