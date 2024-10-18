import React, { useEffect } from 'react';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Impressum from './pages/Impressum.js';
import NotFound from './pages/notFound.js'; // Angenommene NotFound-Komponente
import PetPage from './pages/PetPage.jsx'
import MainPage from "./pages/MainPage.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  useEffect(() => {
    document.title = 'SnuggleBuddy'; // Titel des Tabs
  }, []);

  return (

    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} /> // Startseite
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/impressum' element={<Impressum />} />
          <Route path='/petpage' element={<PetPage />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
