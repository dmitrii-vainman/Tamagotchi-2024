import React, { useState } from 'react';
import PetForm from '../components/petDetails';
import PetImage from '../components/petImage'; 
import { useNavigate } from 'react-router-dom';
import './PetPage.css';

function PetPage() {
  const [selectedColor, setSelectedColor] = useState(''); // Track selected color
  const [petType, setPetType] = useState(''); // Track selected pet type
  const [petName, setPetName] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    const confirmation = window.confirm("Sind Sie sicher, dass Sie die Daten speichern möchten?");
    if (confirmation) {
      navigate('/MainPage');
      // Add any logic for saving data (SQLite or backend)
    } else {
      console.log('Speichern abgebrochen');
    }
  };

  const updatePetType = (type) => {
    setPetType(type); 
  };

  return (
    <div className="pet-page-container" style={{ display: 'flex', alignItems: 'flex-start' }}>
      {/* Form Section */}
      <div className="pet-form-container">
        <PetForm
          updatePetType={updatePetType}
          petType={petType}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setPetName={setPetName}
        />
        <button onClick={handleSubmit} className="submitbuttonpet">
          Bestätigen
        </button>
      </div>

      {/* Image Section */}
      <div className="pet-image-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <PetImage petName={petName} petType={petType} selectedColor={selectedColor} />
      </div>
    </div>
  );
}

export default PetPage;
