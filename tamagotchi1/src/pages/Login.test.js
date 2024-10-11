// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('zeigt eine erfolgreiche Nachricht an, wenn die Anmeldedaten korrekt sind', () => {
    render(<Login />);
  
    // Eingabeelemente und Button auswählen
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Passwort');
    const loginButton = screen.getByText('Login');

    // Gebe korrekte Anmeldedaten ein
    fireEvent.change(emailInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
  
    // Klicke auf den Login-Button
    fireEvent.click(loginButton);

    // Erwartet, dass die Erfolgsmeldung angezeigt wird
    expect(screen.getByText('Login erfolgreich!')).toBeInTheDocument();
});

test('zeigt eine Fehlermeldung an, wenn die Anmeldedaten falsch sind', () => {
    render(<Login />);

    // Eingabeelemente und Button auswählen
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Passwort');
    const loginButton = screen.getByText('Login');

    // Gebe falsche Anmeldedaten ein
    fireEvent.change(emailInput, { target: { value: 'wrongUser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPass' } });

    // Klicke auf den Login-Button
    fireEvent.click(loginButton);

    // Erwartet, dass die Fehlermeldung angezeigt wird
    expect(screen.getByText('Login fehlgeschlagen, bitte überprüfe deine Eingaben!')).toBeInTheDocument();
});
