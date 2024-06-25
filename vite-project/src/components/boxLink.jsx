// src/components/BoxLink.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BoxLink = ({ title, route }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full md:w-1/3 p-4 cursor-pointer"
      onClick={() => navigate(route)}
    >
      <div className="p-6 bg-blue-500 hover:bg-blue-700 text-white text-center font-bold rounded-lg">
        {title}
      </div>
    </div>
  );
};

export default BoxLink;
