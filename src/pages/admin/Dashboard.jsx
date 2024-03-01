import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
        const admin = localStorage.getItem('is_admin');
        console.log(admin);
        console.log(token);

        if (!token) {
          console.error('No token found');
          return;
        }

        // Make a GET request to the /api/users endpoint with the token in the headers
        const response = await axios.get('http://localhost:5000/api/patients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the state with the received user data
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the fetchUserData function when the component mounts
    fetchPatientData();
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page or another desired route
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <h2>Patient Dashboard</h2>
      {patients.map((patient) => (
        <ul key={patient._id}>
          <li>{patient._id}</li>
          <li>{patient.forename}</li>
          <li>{patient.surname}</li>
          <li>{patient.email}</li>
          <li>{patient.department}</li>
          <li>{patient.guardian}</li>
          <li>{patient.guardian_name}</li>
          <li>{patient.notes}</li>
        </ul>
      ))}
    </div>
  );
};

export default Dashboard;
