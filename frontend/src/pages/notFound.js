import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div>
            <h2>Fehler! Die Seite wurde nicht gefunden!</h2>

    
            
            <p><Link to="/login">Einloggen</Link></p>
            <p><Link to="/register">Registrierung</Link></p>
            <p><Link to="/impressum">Impressum</Link></p>

        </div>
    )
}

export default NotFound