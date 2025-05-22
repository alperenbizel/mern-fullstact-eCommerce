import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Cart.css'

function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/getcart', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.data.data?.cartItems) {
                    setProducts(res.data.data.cartItems);
                }
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };
        fetchData();
    }, []);

const deleteCart = async (productId) => {
  try {
    const res = await axios.delete(`http://localhost:8000/api/removecart/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data.success) {
      setProducts(res.data.data.cartItems);  
    }
  } catch (error) {
    console.error(error);
  }
};


    const calculateTotal = () => products.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1 className="neon-title">Alışveriş Sepetin</h1>
                <div className="cyber-line"></div>
            </div>

            {products.length > 0 ? (
                <div className="cart-content">
                    <div className="items-grid">
                        {products.map((item) => (
                            <div className="cart-item" key={item._id}>
                                <div className="item-thumbnail">
                                    <img src={item.image} alt={item.name} />
                                    <div className="quantity-badge">{item.quantity}</div>
                                </div>
                                <div className="item-details">
                                    <h3 className="item-title">{item.name}</h3>
                                    <div className="price-section">
                                        <span className="unit-price">₺{item.price}</span>
                                        <span className="multiplier">×</span>
                                        <span className="quantity">{item.quantity}</span>
                                    </div>
                                    <div className="total-price">₺{(item.price * item.quantity).toFixed(2)}</div>
                                    <div className="stock-bar">
                                        <div 
                                            className="stock-progress" 
                                            style={{ width: `${Math.min(item.stock, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                              <button className="remove-btn" onClick={() => deleteCart(item.product || item._id)}>×</button>
                            </div>
                        ))}
                    </div>

                    <div className="summary-card">
                        <h3 className="summary-title">Sipariş Özeti</h3>
                        <div className="summary-row">
                            <span>Ara Toplam</span>
                            <span>₺{calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Kargo</span>
                            <span className="free-shipping">Ücretsiz</span>
                        </div>
                        <div className="total-row">
                            <span>Toplam</span>
                            <span className="grand-total">₺{calculateTotal().toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn">Ödemeye Geç</button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <div className="hologram-icon">🛒</div>
                    <p className="empty-text">Sepetiniz şu an biraz ıssız görünüyor</p>
                </div>
            )}
        </div>
    );
}

export default Cart;