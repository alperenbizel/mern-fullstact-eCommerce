
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import '../style/CreateProduct.css';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Akıllı Ev',
  });
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({ type: null, message: '' });
  const formRef = useRef(null);
  const canvasRef = useRef(null);

  
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });


  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  
  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    files.forEach(file => form.append('images', file));

    try {
      await axios.post('http://localhost:8000/api/addproduct', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStatus({ type: 'success', message: 'Ürün başarıyla oluşturuldu!' });
      formRef.current.reset();
      setFiles([]);
      setFormData({ name: '', description: '', price: '', category: 'Akıllı Ev' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Bir hata oluştu',
      });
    }
  };


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = 'rgba(155, 90, 246, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

   
    const particles = Array.from({ length: 150 }, () => new Particle());
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="cosmic-container" style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        className="hologram-canvas"
        style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      />

      <form ref={formRef} onSubmit={handleSubmit} className="quantum-form">
        <div className="form-header">
          <h1 className="neon-title">Yeni Ürün Yarat</h1>
          <div className="cyber-line" />
        </div>

        <div className="input-grid">
       
          <div className="input-field hologram-effect">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="neon-input"
              required
              placeholder=" "
            />
            <label className="input-label">Ürün Adı</label>
            <span className="input-border" />
          </div>

     
          <div className="input-field hologram-effect">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="neon-input"
              required
              placeholder=" "
            />
            <label className="input-label">Fiyat (₺)</label>
            <span className="input-border" />
          </div>

     
          <div className="input-field hologram-effect">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="neon-select"
            >
              <option value="Akıllı Ev">Akıllı Ev</option>
              <option value="Giyilebilir Teknoloji">Giyilebilir Teknoloji</option>
              <option value="Diğer">Diğer</option>
            </select>
            <span className="select-arrow">▼</span>
            <span className="input-border" />
          </div>

          <div className="input-field hologram-effect full-width">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="neon-textarea"
              required
              placeholder=" "
            />
            <label className="input-label">Açıklama</label>
            <span className="input-border" />
          </div>
        </div>


        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className="upload-hologram">
            <div className="upload-content">
              <span className="upload-icon">⬆</span>
              <p>Sürükle bırak veya tıkla</p>
              {files.length > 0 && (
                <div className="file-previews">
                  {files.map((file, idx) => (
                    <div key={idx} className="file-preview">
                      <img src={file.preview} alt="preview" />
                      <button
                        type="button"
                        className="remove-file"
                        onClick={e => {
                          e.stopPropagation();
                          setFiles(files.filter((_, i) => i !== idx));
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="cyber-button">
          <span className="cyber-text">Ürünü Yayınla</span>
          <span className="glow" />
          <span className="scanline" />
        </button>

        {status.type && (
          <div className={`status-hologram ${status.type}`}>{status.message}</div>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;