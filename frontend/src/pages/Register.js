import React, { useState } from "react";
import { Link } from "react-router-dom";

/*Dummy-Datenbank
const registeredEmails = ['user@example.com'];*/


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

  const response = await fetch(`http://localhost:3000/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, username})
})
if (response.ok) {
  setMessage('Registrierung erfolgreich!');
  setFormData({email: '', password: '', confirmPassword: '', username: ''});
} else {
  setMessage(data.error || 'Registrierung fehlgeschlagen!')
}
}
  catch(error) {
  setMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut!')
}
  finally {
  setLoading(false)

}
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