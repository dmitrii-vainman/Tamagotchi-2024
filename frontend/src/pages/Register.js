import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = 'http://localhost:5000'

function Register() {

    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Ladezustand hinzufügen
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value});
      setMessage('')
    }

    const validatePassword = (password) => password.length >= 6;

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { email, password, confirmPassword, username} = formData

      await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!validatePassword(password)) {
      setMessage('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;

    } else if (password !== confirmPassword) {
      setMessage('Passwörter stimmen nicht überein!');
      return
    }
    setLoading(true)

try {

  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, username})
});

const data = await response.json();
      
if (response.ok) {
  setMessage('Registrierung erfolgreich!');
  setFormData({email: '', password: '', confirmPassword: '', username: ''});
  setTimeout(() => {
  navigate('/login')}, 1000);
} else { 
  setMessage(data.error || 'Registrierung fehlgeschlagen!')
}

} catch(error) {
  setMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut!')
} finally {
  setLoading(false)
}
};
  return (
    <div className="form-container">
    <h1 className="logo">SnuggleBuddy</h1>{/*Logo*/}
    <form onSubmit={handleSubmit}>

    <label htmlFor="email">E-Mail-Adresse</label>
    
<div className="input-container">
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        placeholder="E-Mail-Adresse:"
        onChange={handleChange}
      /><br/><br/>


    <label htmlFor="username">Benutzername</label>

      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        placeholder="Benutzername:"
        onChange={handleChange}
        /><br/><br/>

    <label htmlFor="password">Passwort</label>

      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        placeholder="Passwort:"
        onChange={handleChange}
    /><br/><br/>

    <label htmlFor="confirmPassword">Passwort bestätigen</label>

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Passwort bestätigen:"
            onChange={handleChange}
            required

          /><br/><br/>
</div>

    {loading && (
      <div className="loader-container">
        
          <div className="loader"></div></div> // Loader anzeigen, wenn loading true ist
        )}
    
    <button className="register-button "type="submit" disabled={!formData.email || !formData.password || !formData.confirmPassword || !formData.username || loading}>
     {loading ? 'Lade ...' : 'Registrierung'}</button>

    <p className={message.includes('erfolgreich') ? 'success' : 'error'}>{message}</p>


  </form>

  <p>Du hast bereits einen Account? <Link to="/login">Einloggen</Link></p>
  <p><Link to="/impressum">Impressum</Link></p>

</div>
)};

export default Register;