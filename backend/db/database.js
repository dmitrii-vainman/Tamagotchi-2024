import sqlite3 from  'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const db = new sqlite3.Database(`./${process.env.DB_NAME}.db`, (err) => {

    if (err) {
        console.log('Fehler beim Öffnen der Datenbank: ' + err.message);
    } 
    else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            coins INTEGER DEFAULT 0, 
            reset_token TEXT,
            reset_token_expiry DATETIME
        )`,(err) => {
            if (err) {
                console.log('Fehler beim Erstellen der users Tabelle" Tabelle: ' + err.message)
            } else {
                console.log('Tabelle users erstellt')
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            petname TEXT,
            species TEXT,
            type TEXT,
            hunger INTEGER DEFAULT 100,
            level INTEGER DEFAULT 0,
            lastFed  DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`, (err) => {
            if (err) {
                console.log('Fehler beim Erstellen der Pet_Tabelle: ' + err.message);
            } else {
                console.log('Pet_Tabelle erfolgreich erstellt.');
            }
        });
    }
});

export default db;