import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, logout } from '../redux/slices/UserSlice'
import {
  FiUser, FiShoppingBag, FiSettings, FiLogOut, FiMapPin,
  FiHeart, FiLock, FiCreditCard
} from 'react-icons/fi'
import { useNavigate,Link } from 'react-router-dom'
import '../style/Profile.css'
import axios from 'axios'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo, loading, error } = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getmyorders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;

    
      setOrders(data.data || []); 
    } catch (error) {
      console.log('Siparişleri çekerken hata oluştu:', error);
    }
  };

  fetchOrders();
}, []);


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/favlist', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setFavorites(res.data)
      } catch (error) {
        console.error('Favorileri çekerken hata oluştu:', error)
      }
    }

    fetchFavorites()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/login')
  }

  if (loading) return <div className="loading-spinner">Yükleniyor...</div>
  if (error) return <div className="error-message">Hata: {error}</div>
  console.log('userInfo:', userInfo);
  return (
    <div className="profile-container">
      <div className="profile-background">
        <div className="floating-element element-profile-1"></div>
        <div className="floating-element element-profile-2"></div>
      </div>

      <div className="profile-content">
     
        <div className="profile-header">
          <div className="avatar">
            <FiUser className="avatar-icon" />
          </div>
          <div className="user-info">
            <h2 className="gradient-text">{userInfo?.data?.name}</h2>
            <p>{userInfo?.data?.email}</p>
            <div className="user-stats">
              <div className="stat-item">
                <FiShoppingBag />
                <span>{orders.length}</span>
              </div>
              <div className="stat-item">
                <FiHeart />
                <span>{favorites.length} Favori</span>
              </div>
            </div>
          </div>
        </div>

 
        <div className="profile-grid">
    
          <div className="profile-card orders">
            <h3><FiShoppingBag /> Siparişlerim</h3>
            <div className="order-list">
              {orders.length === 0 ? (
                <p>Henüz bir siparişiniz yok.</p>
              ) : (
                orders.map((order) => (
                  <div className="order-item" key={order._id}>
                    <div className="order-info">
                      <span>#ORD{order.orderNumber || order._id?.slice(-5)}</span>
                      <span>₺{order.totalPrice}</span>
                    </div>
                    <div className={`order-status ${order.status?.toLowerCase()}`}>
                      <div className="status-bar" style={{ width: '100%' }}></div>
                      <span>{order.status || 'Durum yok'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          
          <div className="profile-card settings">
            <h3><FiSettings /> Hesap Ayarları</h3>
            <div className="settings-list">
              <button className="setting-item"><FiMapPin /> Adreslerim</button>
              <button className="setting-item"><FiLock /> Şifre Değiştir</button>
              <button className="setting-item"><FiCreditCard /> Ödeme Yöntemleri</button>
            </div>
          </div>

      
          <div className="profile-card favorites">
            <h3><FiHeart /> Favori Ürünler</h3>
         <div className="favorite-grid">
  {favorites.length === 0 ? (
    <p>Henüz favori ürününüz yok.</p>
  ) : (
    favorites.map((product) => (
      <div className="favorite-item" key={product._id}>
        <img 
          src={
            product.images && product.images.length > 0
              ? product.images[0].url
              : '/placeholder.jpg'
          } 
          alt={product.name} 
        />
        <span>{product.name}</span>
      </div>
    ))
  )}
</div>

          </div>
        </div>

     
        <button onClick={handleLogout} className="logout-button">
          <FiLogOut /> Çıkış Yap
        </button>
      </div>
    </div>
  )
}

export default Profile
