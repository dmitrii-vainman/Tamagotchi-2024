import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*Dummy-Datenbank
const users = {
  'user@example.com': { password: 'pass123', username: 'user' }
};*/

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [shouldLogin, setShouldLogin] = useState(false);//Zustand für den Login
  const navigate = useNavigate()

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
      setLoading(false);
      return;

    } 
    if (!validatePassword(password)) {
      setMessage('Das Passwort muss mindestens 6 Zeichen lang sein!');
      setLoading(false);
      return;
    }
    setShouldLogin(true)
  }
  useEffect(() => {
    const loginUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Speichere den Token in localStorage oder einer anderen sicheren Stelle
          localStorage.setItem('token', data.token);
          setUsername(data.username);
          setMessage('Login erfolgreich!');
          setEmail('');
          setPassword('');

          checkUserPet();
        } else {
          setMessage(data.error || 'Login fehlgeschlagen!');
          setPassword('');
        }
      } catch (error) {
        setMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      } finally {
        setLoading(false);
        setShouldLogin(false); // Zurücksetzen nach dem Login-Versuch
      }
    };

    if (shouldLogin) {
      loginUser();
    }
  }, 
  
  [shouldLogin, email, password]); // Abhängigkeiten von useEffect

  const checkUserPet = async () => {
    try {
      const response = await fetch(`http://localhost/check-user-pet`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });


      const data = await response.json();

      if (data.hasPet) {
        navigate('/mainpage');
      } else {
        navigate('/petpage')
      }
  } catch(error) {
    console.error('Fehler beim Überprüfen der Daten', error)
    setMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
  }
}
  
  const handleSubmitLogin = () => {
    const confirmation = window.confirm("Sind Sie sicher, dass Sie die Daten speichern möchten?");
    if (!confirmation) {
      console.log('Speichern abgebrochen');
    }; 
}  
  

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

        <button type="submit" onClick={handleSubmitLogin} disabled={!email || !password || loading}>
          {loading ? 'Lade...' : 'Login'}
        </button>

        {message && <p className={message.includes('erfolgreich') ? 'success' : 'error'}>{message}</p>}
        {username && <p>Willkommen, {username}!</p>}
      </form>

      <p><Link to="/register">Registrierung</Link></p>
      <p><Link to="/impressum">Impressum</Link></p>
      <p><Link to="/mainpage">Home</Link></p>
    </div>
  );
};

export default Login;