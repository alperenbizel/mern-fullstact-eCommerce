import React, { useState } from 'react'
import axios from 'axios'
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
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
      const res = await axios.post('http://localhost:8000/api/auth/register', formData)
      setMessage('Kayıt Başarılı! Giriş yapabilirsiniz.')
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (err) {
      setMessage('Kayıt Başarısız: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-floating-bg">
          <div className="floating-element element-5"></div>
          <div className="floating-element element-6"></div>
        </div>
        
        <div className="auth-content">
          <h2 className="gradient-text">Yeni Hesap Oluştur</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
              Hesap Oluştur
              <FiArrowRight className="button-icon" />
            </button>
          </form>

          {message && (
            <div className={`auth-message ${message.includes('Başarılı') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="auth-links">
            <p>Zaten hesabın var mı? <a href="/login">Giriş Yap</a></p>
            <a href="/forgot-password">Şifremi Unuttum</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register