import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute2 = ({ isAdmin, loading, children }) => {
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Yükleniyor...</div>;
  }

  if (!isAdmin) {
    return <Navigate to='/error' />;
  }

  return children;
};

export default ProtectedRoute2;
