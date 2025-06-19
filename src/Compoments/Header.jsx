import React, { useContext, useState } from 'react';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import navLinks from '../constants';
import img from '../images/talash_logo_web.png';
import LoginModal from './LoginModal';
import { AuthContext } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      <header className="bg-[#f7f2e9] shadow-md w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={img} alt="Logo" className="h-14 w-auto rounded-lg" />
            <span className="text-3xl font-bold text-[#744d14]">TALASH</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 font-medium text-black">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.path} className="hover:text-[#c2933c] transition">
                {link.name.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 text-[#744d14] hover:text-[#a6782e]"
              >
                <FiUser size={20} />
                <span>Login</span>
              </button>
            )}
            <Link
              to="/book"
              className="bg-[#b88c3c] hover:bg-[#a6782e] text-white py-2 px-5 rounded-md font-semibold transition"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#f7f2e9] px-6 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="block text-lg font-medium text-[#744d14] hover:text-[#c2933c]"
                onClick={() => setMenuOpen(false)}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-[#744d14] hover:text-[#a6782e] w-full"
                >
                  <FiUser size={20} />
                  <span>Login</span>
                </button>
              )}

              <Link
                to="/book"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-[#b88c3c] hover:bg-[#a6782e] text-white py-2 rounded-md font-semibold transition"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        )}
      </header>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Header;
