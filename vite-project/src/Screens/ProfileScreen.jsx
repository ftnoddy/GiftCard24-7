import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material'; // Import Avatar component from Material-UI
import { AuthContext } from '../context/AuthContext';

function ProfileScreen() {
  const location = useLocation();
  const {user: userInfo} = useContext(AuthContext)
  const [user, setUser] = useState()
  const authToken = userInfo.token || ''
  // Destructure user information
  const { name: userName, email: userEmail } = userInfo
  
  // could be removed it is just to validate the middleware
  useEffect(() => {
    (async () => {
      try {
        console.log("token", authToken)
        const response = await axios.get('http://localhost:5002/api/users/me', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    })();
  }, [])

  // Function to extract first two letters of a string
  const getInitials = (name) => {
    if (!name) return ''; // Check if name is undefined
    const words = name.split(' ');
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0][0].toUpperCase();
  };
  
  // Function to generate background color based on user's name
  const getBackgroundColor = (name) => {
    if (!name) return '#000'; // Default color if name is undefined
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ff9800', '#ff5722', '#795548', '#607d8b'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get first two letters of user's name
  const initials = getInitials(userName);

  // Get background color based on user's name
  const backgroundColor = getBackgroundColor(userName);

  return (
    <div className="flex justify-center items-center h-screen bg-violet-200">
      <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-400">
        <Avatar sx={{ width: 100, height: 100, fontSize: 48, backgroundColor }}>{initials}</Avatar>
        <h2 className="text-3xl font-bold mb-2">{userName}</h2>
        <p className="text-lg">{userEmail}</p>
      </div>
    </div>
  );
}

export default ProfileScreen;
