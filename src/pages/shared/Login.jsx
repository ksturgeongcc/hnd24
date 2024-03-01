import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      console.log('Login successful');
      console.log('Token:', response.data.token);

      // Save the token to local storage
      localStorage.setItem('token', response.data.token);

      // Save the is_admin status to local storage
      // localStorage.setItem('is_admin', response.data.is_admin);

      // Check is_admin status and redirect accordingly
      // if (response.data.is_admin) {
      //   navigate('/patients'); // Redirect to the admin route
      // } else {
        navigate('/dashboard'); // Redirect to the non-admin route
      // }
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
