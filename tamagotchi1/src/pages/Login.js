import React, { useState } from "react";
import { Link } from "react-router-dom";

//Dummy-Datenbank
const users = {
  'user@example.com': { password: 'pass123', username: 'user' }
};

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage(''); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setMessage(''); 
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

   
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!validateEmail(email)) {
      setMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein!');
    } else if (!users[email]) {
      setMessage('E-Mail nicht gefunden!');
      setPassword('');
    } else if (users[email].password !== password) {
      setMessage('Falsches Passwort!');
    } else {
      setUsername(users[email].username);
      setMessage('Login erfolgreich!');
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail-Adresse</label>
        <input
          type="email"
          value={email}
          id="email"
          name="email"
          placeholder="E-Mail-Adresse: "
          onChange={handleEmailChange}
          required
        /><br /><br />

        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Passwort: "
          onChange={handlePasswordChange}
          required
        />
        <br /><br />

        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}

        <button type="submit" disabled={!email || !password || loading}>
          {loading ? 'Lade...' : 'Login'}
        </button>

        {message && <p className={message.includes('erfolgreich') ? 'success' : 'error'}>{message}</p>}
        {username && <p>Willkommen, {username}!</p>}
      </form>

      <p><Link to="/register">Registrierung</Link></p>
      <p><Link to="/impressum">Impressum</Link></p>
    </div>
  );
}

export default Login;
