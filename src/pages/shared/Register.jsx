// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [patient_number, setPatientNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        patient_number,
        password,
      });
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={patient_number}
        onChange={(e) => setPatientNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
