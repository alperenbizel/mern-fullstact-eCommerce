
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const { userInfo, loading } = useSelector((state) => state.user);


  if (!token) {
    return <Navigate to="/login" replace />;
  }

 
  if (loading) {
    return <div>Yükleniyor...</div>;
  }

 
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (userInfo.data.role !== true) {
    return <Navigate to="/error" replace />;
  }


  return children;
};

export default AdminRoute;
