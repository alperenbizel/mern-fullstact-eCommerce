import React from 'react';
import '../style/Footer.css';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

function Footer() {
  return (
<>
<hr/>
 <footer className="footer">
      
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Şirket Adı</h2>
        </div>
        <div className="footer-links">
          <a href="#about">Hakkında</a>
          <a href="#contact">İletişim</a>
          <a href="#privacy">Gizlilik Politikası</a>
        </div>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FiFacebook className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FiTwitter className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FiInstagram className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FiLinkedin className="social-icon" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Şirket Adı. Tüm hakları saklıdır.</p>
      </div>
    </footer>
</>
   
  );
}

export default Footer;
