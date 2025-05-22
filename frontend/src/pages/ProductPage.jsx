import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import '../style/Product.css'

function ProductPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products')
        setProducts(response.data.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="products-container">
      <div className="products-background">
        <div className="floating-element element-products-1"></div>
        <div className="floating-element element-products-2"></div>
      </div>

      <div className="products-content">
        {/* Hero Section */}
        <div className="products-hero">
          <h1 className="gradient-text">Teknoloji Koleksiyonu</h1>
          <p className="hero-subtext">Geleceğin teknolojisi parmaklarınızın ucunda</p>
          
          <div className="products-controls">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Ürün ara..." />
            </div>
            
            <div className="view-options">
              <button 
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'active' : ''}
              >
                <FiGrid />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'active' : ''}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="loading-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="product-skeleton"></div>
            ))}
          </div>
        ) : (
          <div className={`product-list ${viewMode}`}>
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage