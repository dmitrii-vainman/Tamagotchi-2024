import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  // dotenv importieren
import db from './db/database.js';
import cors  from 'cors';
import path from 'path'
import passwordResetRouter from './passwort_reset.js';


dotenv.config();  // .env-Datei laden

const jwtSecret = process.env.JWT_SECRET


const app = express();
const port = 5000;


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const __dirname = path.resolve(); // Falls du Node.js Version >=14 hast
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.use(express.json());

// Middleware zur Token-Verifizierung
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Kein Token vorhanden' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {  // Geheimschlüssel aus Umgebungsvariable
    if (err) {
      console.log('Fehlgeschlagen:', err);
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
    return res.status(200).json({
      message: 'Login erfolgreich!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    });
  });
});

//Haustier-Abfrage
app.get('/check-user-pet', verifyToken, (req, res) => {
  const petSql = 'SELECT * FROM pets WHERE user_id = ?';
  db.all(petSql, [req.user.id], (err, pets) => {
    if (err) {
      console.log("Fehler beim Abrufen der Haustiere", err);
      return res.status(500).json({ error: 'Fehler beim Abrufen der Haustiere' });
   }
   return res.status(200).json({
    hesPet: pets.length > 0
   });
});
});

//Haustier erstellen Endpoint
app.post('/create-pet', verifyToken, (req, res) => {
  const { petname, species, type }  = req.body;

  if(!petname || !species || !type || !age || !food){
    return res.status(400).json({ error: 'Bitte alle Felder ausfüllen'})
    }

  const sqlpet = 'INSERT INTO pets (petname, species, type, age, food, user_id) VALUES (?, ?, ?, ?)';
  db.run(sqlpet, [petname, species, type, req.user.id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Speichern des Haustiers!' });
    }
    res.status(202).json({ message: 'Haustier erfolgreich gespeichert!' });
  });
});


// Geschützter Endpunkt
app.get('/protected-endpoint', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Erfolgreich zugegriffen!' });
});

app.use('/api', passwordResetRouter);  // Verwendung des Passwort-Reset-Routers

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'frontend', 'build', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
  });
}

export default app;