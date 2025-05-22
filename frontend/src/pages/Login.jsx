import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi'
import { fetchUserProfile } from '../redux/slices/UserSlice'
import '../style/Login.css'

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      await dispatch(fetchUserProfile())
      setMessage('Giriş Başarılı')
      window.location.href = '/profile'
    } catch (error) {
      setMessage('Giriş Başarısız: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-floating-bg">
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </div>
        
        <div className="auth-content">
          <h2 className="gradient-text">Hesabına Giriş Yap</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              <FiLogIn className="button-icon" />
              Giriş Yap
            </button>
          </form>

          {message && (
            <div className={`auth-message ${message.includes('Başarılı') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="auth-links">
            <a href="/register">Hesabın yok mu? Kayıt Ol</a>
            <a href="/forgot-password">Şifremi Unuttum</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login