import React, { useState } from "react";

const users = {
  
}

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    




    const handleRegister = () => {
      if (users[email] && users[email] === password) {
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
    
    
    <button onClick={handleRegister}>Login</button>
    <p>{message}</p>
</div>

)}

export default Register;