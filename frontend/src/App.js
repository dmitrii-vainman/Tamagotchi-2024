import React, { useEffect } from 'react';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Impressum from './pages/Impressum.js';
import NotFound from './pages/notFound.js'; // Angenommene NotFound-Komponente
import PetPage from './pages/PetPage.jsx'
import MainPage from "./pages/MainPage.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestReset from './pages/requestPassword.js';
import ResetPassword from './pages/resetPassword.js';
import ProtectedComponent from './components/ProtectedComponent.js'


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
          <Route path="/MainPage" element={<MainPage />}/>
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/reset' element={<RequestReset />} />
          <Route path='/*' element={<NotFound />} />
          <Route path="/protected" element={<ProtectedComponent />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
