// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';
import Home from './pages/shared/Home';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Details from './pages/user/Details';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();
console.log('auth' + isAuthenticated)
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            
              
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              
            
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              )}
              {isAuthenticated && (

              <li>
                <Link to="/patients">Admin Dashboard</Link>
              </li>
              )}
              {isAuthenticated && (

            <li>
              <Link to="/details">Details</Link>
            </li>
            )}
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<AdminDashboard />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
