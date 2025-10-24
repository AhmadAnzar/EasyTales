import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [message, setMessage] = useState('');

  if (!isAuthenticated) {
    navigate('/signin');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await usersAPI.update(user._id, formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase() || '👤'}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>

        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-section">
              <h3>Bio</h3>
              <p>{user?.bio || 'No bio added yet.'}</p>
            </div>

            <div className="detail-section">
              <h3>Account Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{user?.storiesCreated || 0}</span>
                  <span className="stat-label">Stories Created</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{user?.paragraphsWritten || 0}</span>
                  <span className="stat-label">Paragraphs Written</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{user?.votesReceived || 0}</span>
                  <span className="stat-label">Votes Received</span>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default Profile;
