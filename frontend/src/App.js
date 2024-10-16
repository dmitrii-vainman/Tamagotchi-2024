import React, { useEffect } from 'react';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Impressum from './pages/Impressum.js';
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
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/impressum' element={<Impressum />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
