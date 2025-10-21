import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../services/api';

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

      <style jsx>{`
        .profile-page {
          max-width: 800px;
          margin: 0 auto;
        }

        .profile-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 2rem;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: bold;
        }

        .profile-info h1 {
          font-size: 2rem;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .user-email {
          color: #718096;
        }

        .message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .message.success {
          background: #c6f6d5;
          color: #22543d;
        }

        .message.error {
          background: #fed7d7;
          color: #c53030;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #2d3748;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
        }

        .save-button,
        .cancel-button {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .save-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cancel-button {
          background: #e2e8f0;
          color: #4a5568;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .detail-section h3 {
          color: #667eea;
          margin-bottom: 1rem;
        }

        .detail-section p {
          color: #4a5568;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 8px;
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #718096;
          font-size: 0.9rem;
        }

        .profile-actions {
          display: flex;
          gap: 1rem;
        }

        .edit-button,
        .logout-button {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .edit-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .logout-button {
          background: #e2e8f0;
          color: #4a5568;
        }

        .edit-button:hover,
        .logout-button:hover,
        .save-button:hover,
        .cancel-button:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .profile-actions,
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
