import React, { useState } from "react";

const users = {
  'user@example.com': { password: 'pass123', username: 'user'}
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('')



    const handleLogin = () => {
      if (users[email] && users[email].password === password) {
        setUsername(users[email].username)
        setMessage('Login erfolgreich!');
     } else {
        setMessage('Login fehlgeschlagen, bitte überprüfe deine Eingaben!');
    }
};

return (
   
   <div>
      <input 
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
    />
   
      <input 
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
    />
    
    
    <button onClick={handleLogin}>Login</button>
    <p>{message}</p>
    {username && <p>Willkommen, {username}!</p>}{}
</div>

)}

export default Login;