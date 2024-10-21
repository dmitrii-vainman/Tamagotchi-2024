import React from 'react';
import './petImage.css'; // Import your CSS file for styling

const PetImage = ({ petType, selectedColor, petName }) => {
  // Define images for each pet type and color
  const images = {
    dog: {
      '#ed5345': '/images/1.png',
      '#6bd694': '/images/3.png',
    },
    cat: {
      '#ed5345': '/images/2.png',
      '#6bd694': '/images/4.png',
    },
    bird: {
      '#ed5345': '/images/5.png',
      '#6bd694': '/images/6.png',
    },
  };

  const petImageSrc = images[petType]?.[selectedColor] || '/images/1.png'; // Fallback if no match

  return (
    <div 
      className="pet-image-container" 
      style={{ 
        backgroundImage: `url(/images/bg-1.png)`, // Use backticks for template literals
        width: '504px', 
        height: '768px',
        backgroundSize: 'cover', // Ensure the background covers the container
        backgroundPosition: 'center', // Center the background image
        position: 'relative', // Positioning for child elements
        
      }}
    >
      <h2 className='petBuddy'>Dein Buddy {petName}</h2>
      <img src={petImageSrc} alt={petType} className="pet-image" style={{ position: 'absolute', bottom: '10px' }} />
    </div>
  );
};

export default PetImage;
