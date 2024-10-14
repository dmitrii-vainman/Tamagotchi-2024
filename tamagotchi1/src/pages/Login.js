import React, { useState } from "react";
import { Link } from "react-router-dom"

const users = {
  'user@example.com': { password: 'pass123', username: 'user'}
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('')



    const handleSubmit = (event) => {
      event.preventDefault();
      if (users[email] && users[email].password === password) {
        setUsername(users[email].username)
        setMessage('Login erfolgreich!');
     } else {
        setMessage('Login fehlgeschlagen, bitte überprüfe deine Eingaben!');
        setUsername('');
    }
};

return (
   
<div>
  <form onSubmit={handleSubmit}>
    <label htmlFor="email">E-Mail-Adresse</label><br/>
      <input 
        type="text"
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)} 
        required
      /><br/>

   <label htmlFor="password">Passwort</label><br/>
      <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required
    />
    <br/><br/>
    
    <button type="submit" disabled={!email || !password}>Login</button>
    <p>{message}</p>
    {username && <p>Willkommen, {username}!</p>}{}

    </form>
    <p><Link to="/Register">Registrierung</Link></p>
</div>

)}

export default Login;