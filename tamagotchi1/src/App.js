import React from 'react'
import Login from './pages/Login';
import Register from './pages/Register';
import Impressum from './pages/Impressum';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';


function App() {

  return (
    
    <Router>

      <div>

        <Routes>

          <Route path='/' element={<Register />} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/impressum' element={<Impressum />} />
          
        </Routes>

      </div>

  </Router>

  )
}

export default App;
