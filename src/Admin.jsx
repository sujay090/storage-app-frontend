// client/src/Admin.jsx
import React, { useState, useEffect } from 'react';
import { deleteUser, getAllUsers, logoutUser } from './apis/admin.api.js';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './App.jsx';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState("")

  const navigate = useNavigate();

  const { user, loading: userLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const usersData = await getAllUsers();
        if (usersData.success) {
          setUsers(usersData.users);
        } else {
          navigate("/");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle user logout
  const handleLogoutUser = async (userId) => {
    try {
      setLoading(true);
      const result = await logoutUser(userId);
      window.location.reload();
      setNotification(result.message);
    } catch (err) {
      setLoading(false);
      setNotification(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle user deletion (admin only)
  const handleDeleteUser = async (userId) => {
    try {
      setLoading(true);
      const response = await deleteUser(userId);
      window.location.reload();
      setNotification(response.message);
    } catch (error) {
      setNotification(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // ✅ Check current user's role
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>
          {isAdmin ? '👨‍💼 Admin Dashboard' : '👔 Manager Dashboard'}
        </h1>
        <p>
          {isAdmin ? 'Manage users and monitor activity' : 'Monitor users and manage sessions'}
        </p>
        <div className="role-badge">
          <span className={`role-indicator ${user?.role}`}>
            {user?.role?.toUpperCase()} ACCESS
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="table-controls">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="results-info">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((tableUser) => (
              <tr key={tableUser._id} className="user-row">
                <td className="user-avatar-cell">
                  <div className="user-avatar">
                    {tableUser.picture ? (
                      <img src={tableUser.picture} alt={tableUser.name} />
                    ) : (
                      <div className="avatar-initials">
                        {getInitials(tableUser.name)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="user-name">
                  <div className="name-container">
                    <span className="name">{tableUser.name}</span>
                  </div>
                </td>
                <td className="user-email">{tableUser.email}</td>
                <td className="user-status">
                  <span className={`status-badge ${tableUser.isEmailVerified ? 'verified' : 'pending'}`}>
                    {tableUser.isLoggedIn ? '✅ Logged In' : '⏳ Logged Out'}
                  </span>
                </td>
                <td className="actions">
                  <div className="action-buttons">
                    {tableUser.isLoggedIn && (
                      <button
                        className="action-btn logout"
                        title="Logout User"
                        onClick={() => handleLogoutUser(tableUser._id)}
                      >
                        {loading ? "Loading..." : "Logout"}

                      </button>
                    )}

                    {/* ✅ Delete button - Only for admins */}
                    {isAdmin && (
                      <button
                        className="action-btn delete"
                        title="Delete User"
                        onClick={() => handleDeleteUser(tableUser._id)}
                      >
                        {loading ? "Loading..." : "Delete"}
                      </button>
                    )}

                    {/* ✅ Show role restriction message for managers */}
                    {isManager && (
                      <span className="role-restriction" title="Admin privileges required">
                        🔒 Admin Only
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No users found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Admin;