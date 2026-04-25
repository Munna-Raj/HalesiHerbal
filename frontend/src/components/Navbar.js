import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white text-xl">🌿</span>
            </div>
            <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
              Halesi<span className="text-green-600">Herbal</span>
            </h2>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-bold transition-colors">Home</Link>
            <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-bold transition-colors">Products</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-bold transition-colors">About</Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-bold transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-300 shadow-inner"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-100 transition-colors">Admin Panel</Link>
                )}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{user.role}</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="btn bg-gray-800 text-white dark:bg-white dark:text-gray-800 px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 dark:text-gray-300 font-bold hover:text-green-600 px-4">Login</Link>
                <Link to="/register" className="btn btn-primary px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-600/20">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
