import React, { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Impressum from './pages/Impressum';
import NotFound from './pages/NotFound'; // Angenommene NotFound-Komponente
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = 'SnuggleBuddy'; // Titel des Tabs
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} /> // Startseite zur Login-Seite
          <Route path='/register' element={<Register />} />
          <Route path='/impressum' element={<Impressum />} />
          <Route path='*' element={<NotFound />} /> // Fallback für unbekannte Routen
        </Routes>
      </div>
    </Router>
  );
}

export default App;
