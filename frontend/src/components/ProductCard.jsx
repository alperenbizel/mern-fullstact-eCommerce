import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi'
import '../style/ProductCard.css'

function ProductCard({ product, viewMode = 'grid' }) {

  return (
    <div className={`product-card ${viewMode}`}>
      <div className="product-image">
        <img src={product.images[0]?.url} alt={product.name} />
        <div className="product-actions">
          <button className="icon-button">
            <FiHeart className="icon" />
          </button>
          <button className="icon-button">
            <FiShoppingCart className="icon" />
          </button>
        </div>
      </div>

      <div className="product-content">
        <div className="product-header">
          <h3>{product.name}</h3>
          {product.discount > 0 && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
        </div>

        {viewMode === 'list' && (
          <p className="product-description">{product.description}</p>
        )}

        <div className="price-container">
          <div className="price-group">
            <span className="current-price">{product.price.toFixed(2)} TL</span>
            {product.oldPrice && (
              <span className="old-price">{product.oldPrice.toFixed(2)} TL</span>
            )}
          </div>
          
          <Link to={`/product/${product._id}`} className="detail-button">
            <FiEye className="icon" />
            {viewMode === 'grid' ? 'İncele' : 'Detayları Görüntüle'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard