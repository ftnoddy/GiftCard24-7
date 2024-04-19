import React from 'react';

function ProfileScreen({ userName }) {
  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <img src="/default-user-logo.png" alt="User Logo" />
    </div>
  );
}

export default ProfileScreen;
