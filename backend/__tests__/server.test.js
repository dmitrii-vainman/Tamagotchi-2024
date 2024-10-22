import request from 'supertest';
import app from '../server.js'; // Importiere deine Express-App
import db from '../db/database.js'; // Importiere die Datenbank
import bcrypt from 'bcrypt'; // bcrypt für Passwort-Hashing importieren
import dotenv from 'dotenv';

dotenv.config(); // Umgebungsvariablen laden

describe('User Authentication and Pet Management', () => {
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword123',
    hashedPassword: bcrypt.hashSync('testpassword123', 10), // Passwort vorab hashen
  };

  // Vor jedem Test: Datenbank aufräumen und Testbenutzer hinzufügen
  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM users", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
    
    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [testUser.username, testUser.email, testUser.hashedPassword],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  });

  // Test für die Benutzerregistrierung
  it('should register a new user', async () => {
    const newUser = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'newpassword123',
    };

    const response = await request(app)
      .post('/register')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Registrierung erfolgreich!');
  });

  // Test für die Benutzeranmeldung
  it('should login the user and return a token', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined(); // Überprüfe, ob ein Token zurückgegeben wird
  });

  // Test für den geschützten Endpunkt
  it('should access the protected endpoint with valid token', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/protected-endpoint')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Erfolgreich zugegriffen!');
  });
  
  // Test für die Haustier-Erstellung
  it('should create a pet for the user', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });

    const token = loginResponse.body.token;

    const petData = {
      petname: 'Fido',
      species: 'Dog',
      type: 'Beagle',
      age: 3,
      food: 'Dog food',
    };

    const response = await request(app)
      .post('/create-pet')
      .set('Authorization', `Bearer ${token}`)
      .send(petData);

    expect(response.statusCode).toBe(202);
    expect(response.body.message).toBe('Haustier erfolgreich gespeichert!');
  });

  // Test für die Überprüfung der Haustiere des Benutzers
  it('should check if the user has pets', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/check-user-pet')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.hesPet).toBe(false); // Da wir noch kein Haustier erstellt haben
  });
});
