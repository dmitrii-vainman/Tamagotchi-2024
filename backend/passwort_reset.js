import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db/database.js';  // Importiere die Datenbank
import nodemailer from 'nodemailer'; // SMTP für E-Mails
import dotenv from 'dotenv';

dotenv.config();  // .env-Datei laden

const router = express.Router();

// Funktion, um einen E-Mail-Versand einzurichten
const transporter = nodemailer.createTransport({
    service: process.env.GMAIL_SMTP_SERVICE, // z.B. 'gmail'
    host: process.env.GMAIL_SMTP_HOST,
    port: process.env.GMAIL_SMTP_PORT,
    secure: process.env.GMAIL_SMTP_SECURE === 'true', // true für SSL, false für TLS
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Endpoint zum Anfordern eines Passwort-Reset-Links
router.post('/request-reset', async (req, res) => {
    const { email } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }

        // Erzeuge ein Token für den Reset
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Erstelle den Reset-Link
        const resetLink = `${process.env.REACT_APP_BACKEND_URL}/reset-password/${token}`;

        // E-Mail-Versand
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Passwort zurücksetzen',
            text: `Klicke auf den folgenden Link, um dein Passwort zurückzusetzen: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Fehler beim Senden der E-Mail' });
            }
            res.status(200).json({ message: 'Passwort-Reset-Link gesendet!' });
        });
    });
});

// Endpoint zum Zurücksetzen des Passworts
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    // Überprüfe das Token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token ungültig oder abgelaufen' });
        }

        // Passwort hashen
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const sql = 'UPDATE users SET password = ? WHERE id = ?';

        db.run(sql, [hashedPassword, decoded.id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Fehler beim Zurücksetzen des Passworts' });
            }
            res.status(200).json({ message: 'Passwort erfolgreich zurückgesetzt!' });
        });
    });
});

export default router;
