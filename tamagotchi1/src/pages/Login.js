import React, { useState } from "react";
import { Link } from "react-router-dom";

const users = {
  'user@example.com': { password: 'pass123', username: 'user' }
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false); // Ladezustand hinzufügen


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Ladezustand aktivieren

    // Simuliere eine Ladezeit (z.B. beim Abrufen von Daten)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!users[email]) {
      setMessage('E-Mail nicht gefunden!'); 
      setUsername('');
    } else if (users[email].password !== password) {
      setMessage('Falsches Passwort!'); 
      setPassword('');
    } else {
      setUsername(users[email].username);
      setMessage('Login erfolgreich!');
    }

    setLoading(false); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail-Adresse</label><br />
        <input
          type="email" 
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <label htmlFor="password">Passwort</label><br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" disabled={!email || !password || loading}>
          {loading ? 'Lade...' : 'Login'} {/* Ladeanzeige im Button */}
        </button>
        <p>{message}</p>
        {username && <p>Willkommen, {username}!</p>}
      </form>

      <p><Link to="/register">Registrierung</Link></p>
    </div>
  );
}

export default Login;
