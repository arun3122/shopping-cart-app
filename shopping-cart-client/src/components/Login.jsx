import React, { useState } from 'react';
import axios from 'axios';
import { User, Lock } from 'lucide-react';
import './Login.css'; // Import the specific CSS file

const API_URL = 'http://localhost:3000';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        username,
        password
      });

      onLoginSuccess(response.data.token);

    } catch (err) {
      if (err.response) {
        // --- SINGLE DEVICE LOGIC ---
        if (err.response.status === 403) {
          window.alert("You are already logged in on another device.");
          setError("Session active on another device.");
        } else {
          window.alert("Invalid username/password");
          setError("Invalid credentials.");
        }
      } else {
        window.alert("Server error. Is the backend running?");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <User size={18} className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={18} className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;