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
        backgroundImage: `url(/images/bg-1.png)`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        width: '504px', // Same width as the form
        height: '400px', // Adjust height to match form height
        position: 'relative', 
      }}
    >
      <h2 className='petBuddy'>Dein Buddy {petName}</h2>
      <img 
        src={petImageSrc} 
        alt={petType} 
        className="pet-image" 
        style={{ 
          position: 'absolute', 
          bottom: '10px', 
          maxWidth: '50%', // Make the image smaller to fit well
          height: 'auto',
        }} 
      />
    </div>
  );
};

export default PetImage;
