import request from 'supertest';
import app from '../server.js'; // Importiere deine Express-App
import db from '../db/database.js'; // Importiere deine Datenbank

describe('User Authentication', () => {

  let token;

  // Vor jedem Test: Datenbank aufräumen
  beforeEach(async () => {
    await db.run("DELETE FROM users"); // Alle Benutzer aus der DB löschen
  });

  // Test für die Registrierung
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    console.log("Response Register: ", response.body); // Logging zur Prüfung
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Registrierung erfolgreich!');
  });

  // Test für den Login
  it('should login the user and return a token', async () => {
    // Vorher Benutzer registrieren
    await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    // Dann Login versuchen
    const response = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    console.log("Response Login: ", response.body); // Logging zur Prüfung
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined(); // Überprüfe, ob ein Token zurückgegeben wird
    token = response.body.token; // Speichere den Token für spätere Tests
  });

  // Test ohne Token
  it('should fail to access protected route without token', async () => {
    const response = await request(app)
      .get('/protected-endpoint'); // Teste den geschützten Endpunkt

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe('Kein Token vorhanden');
  });

  // Test mit gültigem Token
  it('should access protected route with valid token', async () => {
    // Zuerst Benutzer registrieren und einloggen
    await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword123'
      });

    token = loginResponse.body.token; // Token speichern

    const response = await request(app)
      .get('/protected-endpoint') // Teste den geschützten Endpunkt
      .set('Authorization', `Bearer ${token}`);

    console.log("Response Protected: ", response.body); // Logging zur Prüfung
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Erfolgreich zugegriffen!'); // Beispielantwort
  });

});
