import React from 'react';
import './petImage.css'; // Import your CSS file for styling

const PetImage = ({ petType, selectedColor, petName, pageType }) => {
  // Define images for each pet type and color on different pages
  const images = {
    dog: {
      mainPage: {
        '#ed5345': '/images/1.png',
        '#6bd694': '/images/3.png',
      },
      petPage: {
        '#ed5345': '/images/dog.png',
        '#6bd694': '/images/dog-2.png',
      }
    },
    cat: {
      mainPage: {
        '#ed5345': '/images/2.png',
        '#6bd694': '/images/4.png',
      },
      petPage: {
        '#ed5345': '/images/cat.png',
        '#6bd694': '/images/cat-2.png',
      }
    },
    bird: {
      mainPage: {
        '#ed5345': '/images/5.png',
        '#6bd694': '/images/6.png',
      },
      petPage: {
        '#ed5345': '/images/bird.png',
        '#6bd694': '/images/bird-2.png',
      }
    },
  };

  // Select the correct image based on pet type, color, and page
  const petImageSrc = images[petType]?.[pageType]?.[selectedColor] || '/images/dog.png'; // Fallback to default

  return (
    <div>
     <h2 className='petBuddy'>{petName}</h2>
    
    <div 
      className={`pet-image-container ${pageType}-page`} 
      style={pageType === 'mainPage' ? {
        backgroundColor: 'rgba(38, 38, 38, 0.5)', // Grey with 50% opacity for MainPage
        backgroundPosition: 'center',
        width: '504px',
        height: '400px',
        position: 'relative',
      } : {}}
    >

      <img 
        src={petImageSrc} 
        alt={petType} 
        className="pet-image" 
        style={pageType === 'mainPage' ? {
          position: 'absolute', 
          bottom: '10px', 
          maxWidth: '50%', 
        } : {}} 
      />
    </div>
    </div>
  );
};

export default PetImage;
