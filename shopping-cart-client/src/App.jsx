import React, { useState } from 'react';
import Login from './components/Login';
import Shop from './components/Shop';
import './App.css'; // Global styles

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="app-container">
      {!token ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Shop token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;