
import React from 'react';
import '../style/Home.css';
import { FiArrowRight, FiBox, FiZap, FiCloud } from 'react-icons/fi';
import Footer from '../components/Footer';
import About from '../components/About';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="gradient-text">Geleceğin Alışveriş Deneyimi</h1>
          <p className="hero-subtext">Sadelik ve teknoloji mükemmel uyumda</p>
          <button className="cta-button">
            Koleksiyonu Keşfet <FiArrowRight className="cta-icon" />
          </button>
        </div>
        <div className="hero-background">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FiBox className="icon" />
            </div>
            <h3>Minimalist Kurgu</h3>
            <p>Yalın tasarımda odaklanılmış deneyim</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FiZap className="icon" />
            </div>
            <h3>Anında Erişim</h3>
            <p>Yapay zeka destekli akıllı arayüz</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FiCloud className="icon" />
            </div>
            <h3>Bulut Entegre</h3>
            <p>Nesnelerin interneti ile uyumlu altyapı</p>
          </div>
        </div>
      </section>
<About/>

     
    </div>
  );
}

export default Home;