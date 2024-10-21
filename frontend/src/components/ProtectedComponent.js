import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProtectedComponent = () => {
  const [message, setMessage] = useState('');
  const history = useHistory();

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
<<<<<<< HEAD
      {message}
      <button className="LogoutButton" onClick={handleLogout}>Logout</button> {/* Logout-Button */}
=======
      <header style={headerStyle}>
        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <div>
        {message}
      </div>
>>>>>>> viktor-jihen
    </div>
  );
};

export default ProtectedComponent;
