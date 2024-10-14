import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Register from './Register';

test('Registrierung erfolgreich', () => {
  render(<Register />);

  // Eingabefelder ausfüllen
  fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Passwort/i), {
    target: { value: 'password123' },
  });

  // Formular absenden
  fireEvent.click(screen.getByText(/Registrieren/i));

  // Erfolgsnachricht überprüfen
  expect(screen.getByText(/Registrierung erfolgreich!/i)).toBeInTheDocument();
});

test('Registrierung fehlgeschlagen', () => {
  render(<Register />);

  // Nur E-Mail eingeben
  fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/i), {
    target: { value: 'test@example.com' },
  });

  // Formular absenden
  fireEvent.click(screen.getByText(/Registrieren/i));

  // Fehlermeldung überprüfen
  expect(screen.getByText(/Registrierung fehlgeschlagen, bitte überprüfe deine Eingaben!/i)).toBeInTheDocument();
});
