import React, { useState} from "react";
import { Link } from "react-router-dom";

function RequestReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const apiUrl = 'http://snugglebuddies.de:5000'

    const handleRequestReset = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            // Überprüfen, ob die Anfrage erfolgreich war
            if (!response.ok) {
                setMessage(data.error || 'Fehler beim Passwort zurücksetzen');
                return; 
            }

            setMessage(data.message); //Erfolgsnachricht
        } catch (error) {
            console.error('Fehler beim Überprüfen der Daten:', error);
            setMessage('Es ist ein Fehler beim Senden der Anfrage aufgetreten.');
        }
    
    }

    return (

    <div className="form-container">
    <h1 className="logo">SnuggleBuddy</h1>{/*Logo*/}

    <form onSubmit={handleRequestReset}>
        <label htmlFor="email">E-Mail-Adresse</label>
        <input
          type="email"
          value={email}
          id="email"
          name="email"
          placeholder="E-Mail-Adresse: "
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Password zurücksetzen</button>
    </form>

    {message && <p>{message}</p>}
        <p><Link to="/impressum">Impressum</Link></p>
    </div>
  
    ) 
}

export default RequestReset;