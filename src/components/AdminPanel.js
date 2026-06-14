import React, { useState, useEffect } from 'react';
import '../styles/AdminPanel.css';

export default function AdminPanel({ onBack }) {
  const [users, setUsers] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const hashPassword = (pwd) => {
    let hash = 0;
    for (let i = 0; i < pwd.length; i++) {
      const char = pwd.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  };

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('fitness_app_users') || '{}');
    setUsers(allUsers);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newUsername || newUsername.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (!newPassword || newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (users[newUsername]) {
      setError('Username already exists');
      return;
    }

    const updatedUsers = { ...users };
    const hashedPassword = hashPassword(newPassword);
    updatedUsers[newUsername] = {
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('fitness_app_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUsername('');
    setNewPassword('');
    setSuccess(`User "${newUsername}" created successfully!`);
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`Delete user "${username}"? This cannot be undone.`)) {
      const updatedUsers = { ...users };
      delete updatedUsers[username];
      localStorage.setItem('fitness_app_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setSuccess(`User "${username}" deleted`);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1>⚙️ Admin Panel</h1>
          <button className="btn-back" onClick={onBack}>
            ← Back
          </button>
        </div>

        {error && <div className="admin-error">{error}</div>}
        {success && <div className="admin-success">{success}</div>}

        <div className="admin-section">
          <h2>Create New User</h2>
          <form onSubmit={handleAddUser} className="admin-form">
            <input
              type="text"
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Create User</button>
          </form>
        </div>

        <div className="admin-section">
          <h2>Manage Users ({Object.keys(users).length})</h2>
          <div className="users-table">
            {Object.keys(users).length === 0 ? (
              <p className="no-users">No users yet</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(users).map(([username, userData]) => (
                    <tr key={username}>
                      <td>{username}</td>
                      <td>{new Date(userData.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteUser(username)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
