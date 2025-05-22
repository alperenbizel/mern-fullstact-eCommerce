
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/User.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/getusers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  if (loading) {
    return <div className="users-content"><div className="loading-spinner"></div></div>;
  }

  if (error) {
    return <div className="users-content"><p className="error-message">Hata: {error}</p></div>;
  }

  return (
    <div className="users-content">
      <h2 className="section-title">Kullanıcılar</h2>
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ad</th>
              <th>E-mail</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role ? 'admin' : 'user'}`}>
                    {user.role ? 'Admin' : 'Kullanıcı'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="fab" title="Yeni Kullanıcı Ekle">+</button>
    </div>
  );
}

export default Users;