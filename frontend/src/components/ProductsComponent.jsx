import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/ProductList.css'
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi'

function ProductsComponent() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setProducts(res.data.data)
      } catch (err) {
        console.error('Ürünler yüklenirken hata:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [currentPage])

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteproduct/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setProducts(products.filter(product => product._id !== productId))
    } catch (err) {
      console.error('Silme hatası:', err)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) return <div className="loading-spinner"></div>

  return (
    <div className="products-management">
      <div className="table-header">
        <h3>Ürün Yönetimi</h3>
        <div className="table-controls">
          <div className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="Akıllı Ev Teknolojileri">Akıllı Ev Teknolojileri</option>
            <option value="Giyilerbilir Teknoloji">Giyilerbilir Teknoloji</option>
            <option value="Diğer">Diğer</option>
          </select>
          <button className="add-product-btn">
            
            <FiPlus /><a href="/addproduct">Yeni Ürün Ekle</a> 
          </button>
        </div>
      </div>

      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Kategori</th>
              <th>Fiyat</th>
              <th>Stok</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id}>
                <td>
                  <div className="product-cell">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-thumbnail"
                    />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>₺{product.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-indicator ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} Adet` : 'Stokta Yok'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">
                      <FiEdit />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p-1))}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        <span>Sayfa {currentPage}</span>
        <button 
          onClick={() => setCurrentPage(p => p+1)}
          disabled={products.length < 10}
        >
          Sonraki
        </button>
      </div>
    </div>
  )
}

export default ProductsComponent