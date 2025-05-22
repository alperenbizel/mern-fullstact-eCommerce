
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');

  if (!token) {
 
    return <Navigate to="/" replace />;
  }

  if (token && !userInfo) {
    
    return <div>Yükleniyor...</div>;
  }

  return children;
};


export default ProtectedRoute;
