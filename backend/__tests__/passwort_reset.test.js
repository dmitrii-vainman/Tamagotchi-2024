/*import request from 'supertest';
import app from '../server.js'; // Importiere die Express-App
import db from '../db/database.js'; // Importiere die Datenbank
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passwordResetRouter from '../passwort_reset.js'; // Importiere die sendEmail-Funktion

// Mocke nur die sendEmail-Funktion, nicht die gesamte Datei
jest.mock('../passwort_reset.js', () => ({
    ...jest.requireActual('../passwort_reset.js'),  // Behalte alle anderen Funktionen bei
    sendEmail: jest.fn(() => Promise.resolve()),   // Mock der sendEmail-Funktion
}));

// Test-Benutzerdaten
const testUser = {
    username: 'TestUser',
    email: 'testuser@example.com',
    password: 'Password123',
};

// Registriere die Passwort-Reset-Routen in der App
app.use(passwordResetRouter);

beforeAll((done) => {
    // Erstelle die Tabelle für Tests, falls sie noch nicht existiert
    const sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT UNIQUE, password TEXT)';
    db.run(sql, (err) => {
        if (err) {
            console.error('Fehler beim Erstellen der Tabelle:', err);
            return done(err);
        }

        // Füge einen Testbenutzer hinzu
        const hashedPassword = bcrypt.hashSync(testUser.password, 10);
        const insertSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.run(insertSql, [testUser.username, testUser.email, hashedPassword], (err) => {
            if (err) {
                console.error('Fehler beim Hinzufügen des Testbenutzers:', err);
                return done(err);
            }
            done();
        });
    });
});

afterAll((done) => {
    // Bereinige die Tabelle nach den Tests
    db.run('DROP TABLE IF EXISTS users', (err) => {
        if (err) {
            console.error('Fehler beim Löschen der Tabelle:', err);
            return done(err);
        }
        done();
    });
});

describe('Password Reset', () => {
    it('should send a password reset link to the user', async () => {
        const response = await request(app)
            .post('/request-reset')
            .send({ email: testUser.email });

        console.log('Antwort auf die Passwort-Reset-Anforderung:', response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Passwort-Reset-Link gesendet!');
        expect(sendEmail).toHaveBeenCalled();  // Überprüfen, ob sendEmail aufgerufen wurde
    });

    it('should reset the user password with a valid token', async () => {
        const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const newPassword = 'NewPassword123';

        const response = await request(app)
            .post('/reset-password')
            .send({ token, newPassword });

        console.log('Antwort auf die Passwort-Zurücksetzung:', response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Passwort erfolgreich zurückgesetzt!');

        // Überprüfe, ob das Passwort aktualisiert wurde
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [testUser.email], (err, user) => {
            if (err) {
                console.error('Fehler beim Überprüfen des Benutzers:', err);
                return;
            }
            const isPasswordUpdated = bcrypt.compareSync(newPassword, user.password);
            expect(isPasswordUpdated).toBe(true);
        });
    });

    it('should return an error for invalid token', async () => {
        const response = await request(app)
            .post('/reset-password')
            .send({ token: 'invalid-token', newPassword: 'NewPassword123' });

        console.log('Antwort auf die ungültige Token-Zurücksetzung:', response.body);
        expect(response.statusCode).toBe(403);
        expect(response.body.error).toBe('Token ungültig oder abgelaufen');
    });
});*/
import request from 'supertest';
import app from '../server.js';  // Importiere die Express-App

describe('Password Reset', () => {

  const testEmail = 'test@example.com';
  let token = '';

  it('should send a password reset link', async () => {
    const response = await request(app)
      .post('/api/request-reset')
      .send({ email: testEmail });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Passwort-Reset-Link gesendet!');
  });

  it('should reset the password with a valid token', async () => {
    token = 'deinJWTTokenHier';  // Ersetze mit einem echten Token

    const response = await request(app)
      .post('/api/reset-password')
      .send({ token, newPassword: 'newPassword123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Passwort erfolgreich zurückgesetzt!');
  });

  it('should return an error for an invalid token', async () => {
    const response = await request(app)
      .post('/api/reset-password')
      .send({ token: 'invalidToken', newPassword: 'newPassword123' });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe('Token ungültig oder abgelaufen');
  });

});
