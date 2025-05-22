import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import '../style/About.css';
import { FiArrowUpRight } from 'react-icons/fi';

function FloatingScene() {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 64, 64]}>
        <meshPhongMaterial
          color="#ff6b6b"
          transparent
          opacity={0.8}
          shininess={100}
        />
      </Sphere>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </group>
  );
}

function About() {
  const sectionRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const depth = 20;
      
      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = layer.dataset.speed;
        const x = (clientX - window.innerWidth / 2) * speed;
        const y = (clientY - window.innerHeight / 2) * speed;
        layer.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="next-gen-container" ref={sectionRef}>
      {/* Floating Background Elements */}
      <div className="parallax-layer" data-speed="0.02"></div>
      <div className="parallax-layer" data-speed="0.04"></div>
      
      {/* Hero Section */}
      <section className="quantum-hero">
        <div className="dimensional-box">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <FloatingScene />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            <span className="gradient-text">Sınırları</span>
            <span className="glitch-text">Aşan</span>
            <span className="hologram-text">Çözümler</span>
          </h1>
          <p className="typewriter">Yapay zeka ve kuantum fiziğinin kesişiminde yenilikler yaratıyoruz</p>
        </motion.div>
      </section>

      {/* Fluid Grid Section */}
      <section className="fluid-grid-section">
        {[1, 2, 3, 4].map((item) => (
          <motion.div 
            key={item}
            className="fluid-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="liquid-effect"></div>
            <FiArrowUpRight className="card-icon" />
            <h3>Next Gen Innovation #{item}</h3>
            <p>Disiplinlerarası yaklaşımla tasarlanan devrim niteliğinde çözümler</p>
            <div className="particle-trail"></div>
          </motion.div>
        ))}
      </section>

      {/* Holographic Interface */}
      <div className="holographic-interface">
        <div className="laser-grid"></div>
        <div className="neon-pulse"></div>
        <div className="data-stream">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="binary-digit"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;