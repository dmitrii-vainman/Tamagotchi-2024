import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    

    const handleSubmit = (event) => {
      event.preventDefault();

      if (password !== confirmPassword) {
        setMessage('Passwörter stimmen nicht überein!')
        setConfirmPassword('');

     } else if (email && password) {

        setMessage('Registrierung erfolgreich!');
     } else {

        setMessage('Registrierung fehlgeschlagen, bitte überprüfe deine Eingaben!');
        setPassword('');
        setConfirmPassword('');
    }

   
    
}

return (   
<div>

  <form onSubmit={handleSubmit}>

    <label htmlFor="email">E-Mail-Adresse</label><br/>

      <input 
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      /><br/>

   <label htmlFor="password">Passwort</label><br/>

      <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
    /><br/>

    <label htmlFor="confirmPassword">Passwort bestätigen</label><br/>

          <input 
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required

          /><br/><br/>
    
    <button type="submit" disabled={!email || !password || !confirmPassword}>Registrieren</button>
    <p className={message.includes('erfolgreich') ? 'success' : 'error'}>{message}</p>


  </form>

  <p>Du hast bereits einen Account!? <Link to="/login">Einloggen</Link></p>

</div>
)}

export default Register;