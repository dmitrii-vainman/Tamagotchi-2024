import React from "react";
import { Link } from "react-router-dom";

function Impressum() {

    return (

        <div>
            <h2>Unser Impressum</h2>

            <p>
                Dieses Projekt wird von uns als Gruppe im Rahmen einer Weiterbildung durchgeführt!   
            </p>

            <p><Link to="/login">Einloggen</Link></p>
            <p><Link to="/register">Registrierung</Link></p>

        </div>
    )
}

export default Impressum