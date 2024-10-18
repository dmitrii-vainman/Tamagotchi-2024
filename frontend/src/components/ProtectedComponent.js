import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProtectedComponent = () => {
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token'); // Token aus dem Local Storage holen

      try {
        const response = await fetch('http://35.159.51.51:3000/protected-endpoint', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token im Header senden
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        setMessage(data.message);
      } catch (error) {
        setMessage('Zugriff verweigert: ' + error.message);
      }
    };

    fetchProtectedData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token aus dem Local Storage entfernen
    history.push('/login'); // Zur Login-Seite weiterleiten
  };

  return (
    <div
      style={{ textAlign: 'center', marginTop: '20px' }}
    >
      <p>{message || 'Lade geschützte Daten...'}</p>
      
      <button 
        onClick={handleLogout} 
        style={{
          padding: '10px 20px',                
          backgroundColor: 'black',          
          color: 'white',                      
          border: '2px solid white',                      
          borderRadius: '10px',                 
          cursor: 'pointer',                   
          marginTop: '20px'                    
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProtectedComponent;
