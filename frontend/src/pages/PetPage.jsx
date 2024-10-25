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
  const [error, setError] = useState(''); // State to track error messages
  
  const handleSubmit = async () => {
    if (!petName || !petType || !selectedColor) {
      setError("Bitte alle Felder ausfüllen");
      return;
    }

    const confirmation = window.confirm("Sind Sie sicher, dass Sie die Daten speichern möchten?");
    if (!confirmation) {
      console.log('Speichern abgebrochen');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/create-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          petname: petName,
          species: selectedColor,
          type: petType
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/MainPage");
      } else {
        setError(data.error || 'Fehler beim Speichern des Haustiers');
      }
    } catch (err) {
      setError('Verbindungsfehler zum Server');
      console.error('Error:', err);
    }
  };

  const updatePetType = (type) => {
    setPetType(type); 
  };

  return (
    <div className="pet-page-container" >
      {/* Form Section */}
      <div className="pet-form-container" >
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
      <div className="pet-image-container">
      <PetImage petType={petType} selectedColor={selectedColor} petName={petName} pageType="petPage" />


      </div>
    </div>
  );
}

export default PetPage;
