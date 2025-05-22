import React, { useState, useEffect } from 'react';
import '../style/Navbar.css';
import { FiMenu, FiX ,FiShoppingCart} from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, logout } from '../redux/slices/UserSlice';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
 
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logout());
  };


  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={closeMobileMenu}>
        ShopX
      </div>

      {loading ? (
        <p>Yükleniyor...</p> 
      ) : (
        <>
          <div
            className="navbar-toggle"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </div>

          <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-links">
              <li><a href="/" onClick={closeMobileMenu}>Ana Sayfa</a></li>
              <li><a href="/products" onClick={closeMobileMenu}>Ürünler</a></li>
              <li><a href="#" onClick={closeMobileMenu}>Hakkımızda</a></li>
              <li><a href="#" onClick={closeMobileMenu}>İletişim</a></li>
            </ul>

           
            {userInfo ? (
              
              <div className="navbar-auth">
                <button className="auth-button" onClick={handleLogout}>Çıkış Yap</button>
                <Link to="/profile">
                  <button className="auth-button">Profil</button>
                </Link>
                <Link to="/cart" className="cart-button" aria-label="Sepet">
            <FiShoppingCart />
            
          </Link>
              </div>
            ) : (
              
              <div className="navbar-auth">
                <Link to="/login">
                  <button className="auth-button">Giriş Yap</button>
                </Link>
                <Link to="/register">
                  <button className="auth-button">Kayıt Ol</button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
