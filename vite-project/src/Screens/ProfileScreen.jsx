import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material'; // Import Avatar component from Material-UI

function ProfileScreen() {
  const location = useLocation();
  const userInfo = location.state || JSON.parse(localStorage.getItem('userInfo'));

  // Destructure user information
  const { userName, userEmail } = userInfo || {};

  // Function to extract first two letters of a string
  const getInitials = (name) => {
    const words = name.split(' ');
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0][0].toUpperCase();
  };

  // Function to generate background color based on user's name
  const getBackgroundColor = (name) => {
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
