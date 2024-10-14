import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  // dotenv importieren
import db from './db/database.js';

dotenv.config();  // .env-Datei laden

const app = express();
const port = 3000;

app.use(express.json());

// Middleware zur Token-Verifizierung
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Kein Token vorhanden' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {  // Geheimschlüssel aus Umgebungsvariable
    if (err) {
      return res.status(403).json({ error: 'Token ungültig oder abgelaufen' });
    }

    req.user = user; 
    next();
  });
};

// Registrierungs-Endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.run(sql, [username, email, hashedPassword], (err) => {
    if (err) {
      return res.status(400).json({ error: 'Benutzername oder E-Mail bereits vergeben' });
    }
    res.status(201).json({ message: 'Registrierung erfolgreich!' });
  });
});

// Login-Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Benutzer nicht gefunden' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Ungültiges Passwort' });
    }

    // JWT erzeugen
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Geschützter Endpunkt
app.get('/protected-endpoint', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Erfolgreich zugegriffen!' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
  });
}

export default app;
