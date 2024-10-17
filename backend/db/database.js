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
        )`,(err) => {
            if (err) {
                console.log('Fehler  beim Erstellen der Tabelle: ' + err.message)
            } else {
                console.log('Tabelle erstellt')
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            petname TEXT,
            species TEXT,
            type TEXT,
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