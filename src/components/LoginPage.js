import React, { useState } from 'react';
import '../styles/LoginPage.css';

export default function LoginPage({ onLoginSuccess, onAdminMode }) {
  const [mode, setMode] = useState('login'); // login, register, admin
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const hashPassword = (pwd) => {
    let hash = 0;
    for (let i = 0; i < pwd.length; i++) {
      const char = pwd.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('fitness_app_users') || '{}');
      if (!users[username]) {
        setError('User not found');
        setLoading(false);
        return;
      }

      const hashedPassword = hashPassword(password);
      if (users[username].passwordHash !== hashedPassword) {
        setError('Invalid password');
        setLoading(false);
        return;
      }

      localStorage.setItem('fitness_app_current_user', username);
      onLoginSuccess(username);
      setLoading(false);
    }, 300);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    const users = JSON.parse(localStorage.getItem('fitness_app_users') || '{}');
    if (users[username]) {
      setError('Username already exists');
      return;
    }

    const hashedPassword = hashPassword(password);
    users[username] = {
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('fitness_app_users', JSON.stringify(users));
    localStorage.setItem('fitness_app_current_user', username);
    onLoginSuccess(username);
  };

  const handleAdminMode = (e) => {
    e.preventDefault();
    setError('');

    const adminPass = 'admin123'; // Change this to a secure password
    if (adminPassword !== adminPass) {
      setError('Invalid admin password');
      return;
    }

    onAdminMode();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>App Login</h1>
          <p>Track your fitness journey</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Sign In</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div className="login-links">
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode('register');
                  setError('');
                  setPassword('');
                }}
              >
                Create account
              </button>
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode('admin');
                  setError('');
                }}
              >
                Admin login
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} className="login-form">
            <h2>Create Account</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Create Account</button>
            <div className="login-links">
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode('login');
                  setError('');
                  setPassword('');
                }}
              >
                Back to login
              </button>
            </div>
          </form>
        )}

        {mode === 'admin' && (
          <form onSubmit={handleAdminMode} className="login-form">
            <h2>Admin Login</h2>
            <input
              type="password"
              placeholder="Admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              autoFocus
            />
            <button type="submit">Admin Panel</button>
            <div className="login-links">
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode('login');
                  setError('');
                  setAdminPassword('');
                }}
              >
                Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
