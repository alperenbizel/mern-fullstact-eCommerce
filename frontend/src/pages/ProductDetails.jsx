import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiArrowLeft } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import '../style/ProductDetail.css'

function ProductDetails() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [productList, setProductsList] = useState([])
  const [addToCartMessage, setAddToCartMessage] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/product/${productId}`)
        setProduct(res.data.data)

        const listRes = await axios.get(`http://localhost:8000/api/products`)
        setProductsList(listRes.data.data)
      } catch (error) {
        console.error("Ürün verisi alınamadı:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/favlist', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setIsFavorite(res.data.some(fav => fav._id === productId))
      } catch (error) {
        console.error('Favoriler alınamadı:', error)
      }
    }

    if (productId) {
      fetchProductDetails()
      fetchFavorites()
    }
  }, [productId])

  const handleAddToCart = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/addtocart', {
        product: product._id,
        quantity,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || ''
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (res.data.success) {
        setAddToCartMessage('Ürün sepete eklendi!')
        setTimeout(() => setAddToCartMessage(''), 3000)
      }
    } catch (error) {
      console.error(error)
      setAddToCartMessage('Sepete eklenirken hata oluştu.')
      setTimeout(() => setAddToCartMessage(''), 3000)
    }
  }

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:8000/api/deletefav/${product._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setIsFavorite(false)
      } else {
        await axios.post('http://localhost:8000/api/addfavorite', {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0]?.url || ''
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Favori işlemi hatalı:', error)
    }
  }

  if (loading) return <div className="loading-container"><div className="product-skeleton" /></div>
  if (!product) return <div className="error-message">Ürün bulunamadı</div>

  return (
    <div className="product-details-container">
      <div className="floating-bg">
        <div className="floating-element element-details-1" />
        <div className="floating-element element-details-2" />
      </div>

      <div className="product-content">
        <nav className="product-nav">
          <Link className="back-button back-button-click" to="/products"><FiArrowLeft /> Alışverişe Devam Et</Link>
        </nav>

        <div className="product-main">
          <div className="product-gallery">
            <div className="main-image">
              <img
                src={product.images[selectedImage]?.url}
                alt={product.name}
                onError={(e) => e.target.src = '/placeholder-product.jpg'}
              />
            </div>
            <div className="thumbnail-grid">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`thumbnail ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img.url} alt={`Thumbnail ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="gradient-text">{product.name}</h1>

            <div className="price-section">
              {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
              <div className="price-group">
                <span className="current-price">{product.price.toFixed(2)} TL</span>
                {product.oldPrice && <span className="old-price">{product.oldPrice.toFixed(2)} TL</span>}
              </div>
            </div>

            <div className="product-meta">
              <div className="meta-item"><FiStar className="meta-icon" /> Kaliteli Malzeme</div>
              <div className="meta-item"><FiTruck className="meta-icon" /> 2 İş Gününde Teslimat</div>
            </div>

            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1}>-</button>
              <span className="quantity">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart" onClick={handleAddToCart}>
                <FiShoppingCart /> Sepete Ekle
              </button>
              {addToCartMessage && <div className="add-to-cart-message">{addToCartMessage}</div>}
              <button className="add-to-favorites" onClick={toggleFavorite}>
                <FiHeart /> {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              </button>
            </div>

            <div className="detail-tabs">
              <button
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Açıklama
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && <p className="product-description">{product.description}</p>}
            </div>
          </div>
        </div>

        <section className="related-products">
          <h2>Benzer Ürünler</h2>
          <div className="related-grid">
            {productList.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductDetails
