import React from "react";
import { Link } from "react-router-dom";
import './Impressum.css'; // Import your CSS file

function Impressum() {
    return (
        <div className="impressum-container">
            <div>
            <h1 className="logo">SnuggleBuddy</h1>
                <h2>Unser Impressum</h2>
                <p>Dieses Projekt wird von uns als Gruppe im Rahmen einer Weiterbildung durchgeführt!</p>
                <p><Link to="/login">Einloggen</Link></p>
                <p><Link to="/register">Registrierung</Link></p>
            </div>
        </div>
    )
}

export default Impressum;
