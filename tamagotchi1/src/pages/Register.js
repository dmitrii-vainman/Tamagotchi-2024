import React, { useState } from "react";
import { Link } from "react-router-dom";

//Dummy-Datenbank
const registeredEmails = ['user@example.com'];

function Register() {

    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Ladezustand hinzufügen


    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value});
      setMessage('')
    }

    const validatePassword = (password) => password.length >= 6;

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { email, password, confirmPassword, username} = formData

      setLoading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!validatePassword(password)) {
      setMessage('Das Passwort muss mindestens 6 Zeichen lang sein.');
    } else if (password !== confirmPassword) {
      setMessage('Passwörter stimmen nicht überein!');
    } else if (registeredEmails.includes(email)) { 
      setMessage('Diese E-Mail-Adresse ist bereits registriert.');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } else  {
      setMessage('Registrierung erfolgreich!');
      setFormData({ email: '', password: '', confirmPassword: '', username: '' });
    };

      setLoading(false)
    }

return (   
<div>

  <form onSubmit={handleSubmit}>

    <label htmlFor="email">E-Mail-Adresse</label>

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

    {loading && (
      <div className="loader-container">
          <div className="loader"></div></div> // Loader anzeigen, wenn loading true ist
        )}

    <button type="submit" disabled={!formData.email || !formData.password || !formData.confirmPassword || !formData.username || loading}>
     {loading ? 'Lade ...' : 'Registrierung'}</button>

    <p className={message.includes('erfolgreich') ? 'success' : 'error'}>{message}</p>
    

  </form>

  <p>Du hast bereits einen Account? <Link to="/login">Einloggen</Link></p>
  <p><Link to="/impressum">Impressum</Link></p>

</div>
)}

export default Register;