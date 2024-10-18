import React, { useEffect } from 'react';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Impressum from './pages/Impressum.js';
import NotFound from './pages/notFound.js'; // Angenommene NotFound-Komponente
import PetPage from './pages/PetPage.jsx'
import MainPage from "./pages/MainPage.jsx"
import VirtualPet from './components/petFeed.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  useEffect(() => {
    document.title = 'SnuggleBuddy'; // Titel des Tabs
  }, []);
<<<<<<< HEAD
=======

>>>>>>> 1d2302d606a7aca608d055442b1542ef09ccd81a
  return (

    <Router>
      <div>
        <Routes>
<<<<<<< HEAD

          <Route path='/' element={<Login />} /> // Startseite zur Login-Seite
=======
          <Route path='/' element={<Login />} /> // Startseite
>>>>>>> 1d2302d606a7aca608d055442b1542ef09ccd81a
          <Route path='/login' element={<Login />} />
          <Route path='/petfeed' element={<VirtualPet />} />
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
