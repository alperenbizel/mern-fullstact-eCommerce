
import React, { useEffect, useRef } from 'react';

const Layout = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

   
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'rgba(255, 255, 255, 0.8)';
      }

 
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

    
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

   
    const particles = Array.from({ length: 150 }, () => new Particle());
    
  
    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();    
      });
      animId = requestAnimationFrame(animate);  
    };
    animate();  

  
    return () => {
      cancelAnimationFrame(animId);  
      window.removeEventListener('resize', resize);  
    };
  }, []);

  return (
    <div className="cosmic-container">
      <canvas ref={canvasRef} className="hologram-canvas" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
