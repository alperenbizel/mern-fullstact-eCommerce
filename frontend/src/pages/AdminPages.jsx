
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Users from '../components/Users'
import { FiActivity, FiUsers, FiBox, FiDollarSign, FiSettings } from 'react-icons/fi'
import '../style/Admin.css'
import ProductsComponent from '../components/ProductsComponent'

function AdminPages() {
  const [adminData, setAdminData] = useState(null)
  const [stats, setStats] = useState({})
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        
        const [adminRes, statsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/adminpages', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:8000/api/stats', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        setAdminData(adminRes.data.data)
        setStats(statsRes.data)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])



  if (loading) return <div className="loading-spinner"></div>

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Paneli</h2>
          <div className="admin-info">
            <p>{adminData?.name}</p>
            <small>{adminData?.email}</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiActivity /> Dashboard
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers /> Kullanıcılar
          </button>
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            <FiBox /> Ürünler
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stats-card">
                <FiUsers className="stats-icon" />
                <div>
                  <h3>{stats.totalUsers || 0}</h3>
                  <p>Toplam Kullanıcı</p>
                </div>
              </div>
              
              <div className="stats-card">
                <FiBox className="stats-icon" />
                <div>
                  <h3>{stats.totalProducts || 0}</h3>
                  <p>Toplam Ürün</p>
                </div>
              </div>

              <div className="stats-card">
                <FiDollarSign className="stats-icon" />
                <div>
                  <h3>₺{stats.totalRevenue?.toLocaleString() || 0}</h3>
                  <p>Toplam Ciro</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-content">
            <Users />
          </div>
        )}
        {activeTab === 'products' && (
  <div className="products-content">
    <ProductsComponent />
  </div>
)}

        
      </div>
    </div>
  )
}

export default AdminPages