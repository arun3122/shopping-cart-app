import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, History, LogOut, CheckCircle } from 'lucide-react';
import './Shop.css'; // Import the specific CSS file

const API_URL = 'http://localhost:3000';

const Shop = ({ token, onLogout }) => {
  const [items, setItems] = useState([]);

  // Setup Axios with the token header
  const authConfig = {
    headers: { 'Authorization': token }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/items`);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to load items");
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await axios.post(`${API_URL}/carts`, { item_id: item._id }, authConfig);
      // Optional feedback
      alert(`${item.name} added to cart!`);
    } catch (err) {
      window.alert("Failed to add item.");
    }
  };

  const handleViewCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/carts`, authConfig);
      if (res.data.length === 0) return window.alert("Cart is empty.");
      
      const list = res.data.map(i => `• ${i.name} (ID: ${i._id})`).join('\n');
      window.alert(`YOUR CART:\n\n${list}`);
    } catch (err) {
      window.alert("Error fetching cart.");
    }
  };

  const handleOrderHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`, authConfig);
      if (res.data.length === 0) return window.alert("No past orders.");
      
      window.alert(`ORDER HISTORY:\n\n${res.data.join('\n')}`);
    } catch (err) {
      window.alert("Error fetching history.");
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(`${API_URL}/orders`, {}, authConfig);
      window.alert("Order Successful!");
    } catch (err) {
      window.alert("Checkout failed. Cart might be empty.");
    }
  };

  return (
    <div className="shop-wrapper">
      <nav className="navbar">
        <div className="logo">ABCDE Shop</div>
        <div className="nav-actions">
          <button onClick={handleCheckout} className="btn btn-checkout">
            <CheckCircle size={16} /> Checkout
          </button>
          <button onClick={handleViewCart} className="btn btn-nav">
            <ShoppingCart size={16} /> Cart
          </button>
          <button onClick={handleOrderHistory} className="btn btn-nav">
            <History size={16} /> Orders
          </button>
          <button onClick={onLogout} className="btn btn-logout">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="items-grid">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <div className="item-image-placeholder">
              <span>{item.name}</span>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
              <button onClick={() => handleAddToCart(item)} className="add-btn">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Shop;