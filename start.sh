#!/bin/bash

# Wechsle in das Backend-Verzeichnis und installiere die Abhängigkeiten
echo "Installing backend dependencies..."
cd backend
npm install

# Wechsle zurück ins Hauptverzeichnis und dann ins Frontend-Verzeichnis
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Führe den Build im Frontend durch
echo "Building frontend..."
npm run build

# Wechsle zurück ins Backend-Verzeichnis, um die .env-Datei zu erstellen
echo "Setting up environment variables for backend..."
cd ../backend

# Erstelle die .env-Datei mit den erforderlichen Inhalten
cat <<EOT >> .env
JWT_SECRET=your_super_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASS=geheimes_passwort
DB_NAME=users
REACT_APP_BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
# Gmail SMTP configuration
GMAIL_SMTP_HOST=smtp.gmail.com
GMAIL_SMTP_PORT=587
GMAIL_SMTP_SECURE=false
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_email_password
EOT

# Starte die Backend-Anwendung
echo "Starting the application..."
npm start

echo "Setup complete. Your application should be running!"
