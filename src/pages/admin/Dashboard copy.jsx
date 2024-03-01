import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Retrieve the token from local storage
          const token = localStorage.getItem('token');
          const admin = localStorage.getItem('is_admin');
          console.log('admin', admin)
          console.log(token);
  
          if (!token) {
            console.error('No token found');
            return;
          }
  
          // Make a GET request to the /api/users endpoint with the token in the headers
          const response = await axios.get('http://localhost:5000/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Update the state with the received user data
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      // Call the fetchUserData function when the component mounts
      fetchUserData();
    }, []); // The empty dependency array ensures this effect runs only once on component mount
  
    return (
    <div>
      <h2>User Dashboard</h2>
      {user && (

      <ul key={user._id} >
        
          <li>{user._id}</li>
          <li>{user.forename}</li>
          <li>{user.surname}</li>
          <li>{user.email}</li>
          <li>{user.department}</li>
          
      
      </ul>
      )}
    </div>
  );
};

export default Dashboard;
