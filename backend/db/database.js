import sqlite3 from  'sqlite3';

const db = new sqlite3.Database('./users.db', (err) => {

    if (err) {
        console.log('Fehler beim Öffnen der Datenbank: ' + err.message);
    } 
    else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT
        )`);
        }
    });

    export default db;