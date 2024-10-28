import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams(); // Der Token wird aus der URL geholt
  const apiUrl = 'http://snugglebuddys.de';
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwörter stimmen nicht überein');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }), // Token und neues Passwort senden
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Fehler beim erstellen des neuen Passworts');
        return;
      }

      setMessage('Passwort erfolgreich geändert!');
      // Weiterleiten nach erfolgreichem Passwort-Reset
      navigate('/login');
    } catch (error) {
      console.error('Fehler beim erstellen des neuen Passworts:', error);
      setMessage('Es ist ein Fehler aufgetreten.');
    }
  };

  return (
    <div className='form-container'>
      <h1 className="logo">SnuggleBuddy</h1>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="password">Neues Passwort</label>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Neues Passwort"
          />
        </div>

        <label htmlFor="confirmPassword">Passwort bestätigen</label>
        <div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Passwort bestätigen"
          />
        </div>

        <button type="submit">Passwort ändern</button>
      </form>
      {message && <p>{message}</p>}

      <p><Link to="/impressum">Impressum</Link></p>
    </div>
  );
}

export default ResetPassword;
