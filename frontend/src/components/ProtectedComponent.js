import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export const handleLogout = (navigate) => { 
  localStorage.removeItem('token'); // Token aus dem Local Storage entfernen
  navigate('/login'); // Zur Login-Seite weiterleiten
};

const ProtectedComponent = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate anstelle von useHistory

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token'); // Token aus dem Local Storage holen
      console.log("Token:", token); // Debugging: Überprüfen, ob das Token vorhanden ist

      try {
        const response = await fetch('http://35.159.51.51:3000/protected-endpoint', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token im Header senden
          },
        });

        const data = await response.json();
        if (!response.ok) { 
          throw new Error(data.error);
        }

        setMessage(data.message);
      } catch (error) {
        setMessage('Zugriff verweigert: ' + error.message);
      }
    };

    fetchProtectedData();
  }, []);

  const handleLogoutClick = () => { // Funktion umbenennen, um Namenskonflikte zu vermeiden
    localStorage.removeItem('token'); // Token aus dem Local Storage entfernen
    navigate('/login'); // Zur Login-Seite weiterleiten
  };

  // Inline-Stile
  const headerStyle = {
    position: 'relative',
    backgroundColor: 'black',
    padding: '10px',
  };

  const buttonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: '2px solid white',
    borderRadius: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover-Effekt
  };

  return (
    <div>
      {message}
      <button onClick={handleLogoutClick}>Logout</button> {/* Logout-Button */}
    </div>
  );
};

export default ProtectedComponent;
