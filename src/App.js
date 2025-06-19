// src/App.js
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Compoments/Header';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Tours from './pages/Tours';
import Booknow from './pages/Booknow';
import Contact from './pages/contact';
import Login from './Compoments/Login';
import Hero from './Compoments/Hero';
import Admin from './Compoments/Admin';
import ProtectedRoute from './Compoments/protected'; // ✅ import this

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />

        <div className="flex-1 pt-[10px] overflow-hidden">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/book" element={<Booknow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* ✅ Protected admin route */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
