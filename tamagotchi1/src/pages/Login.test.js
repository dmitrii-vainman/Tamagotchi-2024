import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

test('Login erfolgreich', () => {
  render(<Login />);

  // E-Mail und Passwort eingeben
  fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/i), {
    target: { value: 'user@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Passwort/i), {
    target: { value: 'pass123' },
  });

  // Formular absenden
  fireEvent.click(screen.getByText(/Login/i));

  // Erfolgsnachricht überprüfen
  expect(screen.getByText(/Login erfolgreich!/i)).toBeInTheDocument();
  expect(screen.getByText(/Willkommen, user!/i)).toBeInTheDocument();
});

test('Login fehlgeschlagen', () => {
  render(<Login />);

  // Ungültige E-Mail und Passwort eingeben
  fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/i), {
    target: { value: 'wrong@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Passwort/i), {
    target: { value: 'wrongpass' },
  });

  // Formular absenden
  fireEvent.click(screen.getByText(/Login/i));

  // Fehlermeldung überprüfen
  expect(screen.getByText(/Login fehlgeschlagen, bitte überprüfe deine Eingaben!/i)).toBeInTheDocument();
});
