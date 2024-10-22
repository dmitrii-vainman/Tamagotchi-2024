import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = 'http://localhost:5000'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [shouldLogin, setShouldLogin] = useState(false);//Zustand für den Login
  const navigate = useNavigate();

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
  

      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        console.log("API Response Status:", response.status); // Status der Antwort
        console.log("API Response Body:", await response.clone().json()); // Antwort-Body
        console.log("Fehler", response)
        const data = await response.json();
        console.log("Fehler", data)

        if (response.ok) {
          // Speichere den Token in localStorage oder einer anderen sicheren Stelle
          localStorage.setItem('token', data.token);
          setUsername(data.user.username);
          setMessage('Login erfolgreich!');
          setEmail('');
          setPassword('');

          checkUserPet();
        } else {
          setMessage(data.error || 'Login fehlgeschlagen!');
          setPassword('');
        }
      } catch (error) {
        console.error('Fehler beim Überprüfen der Daten', error)
        setMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      } finally {
        setLoading(false);
      }
    };

  const checkUserPet = async () => {
    try {
      const response = await fetch(`${apiUrl}/check-user-pet`, {
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
      <h1 className="logo">SnuggleBuddy</h1>{/*Logo*/}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail-Adresse</label>
        <div className="input-container">
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
</div>
        <button className="login-button" type="submit" onClick={handleSubmitLogin} disabled={!email || !password || loading}>
          {loading ? 'Lade...' : 'Login'}
        </button>

        {message && <p className={message.includes('erfolgreich') ? 'success' : 'error'}>{message}</p>}
        {username && <p>Willkommen, {username}!</p>}
      </form>

      
      <p><Link to="/register">Registrierung</Link></p>
      <p><Link to="/impressum">Impressum</Link></p>
      
    </div>
  );
};

export default Login;