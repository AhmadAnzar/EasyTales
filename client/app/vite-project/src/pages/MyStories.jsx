import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storiesAPI } from '../services/api';
import StoryCard from '../components/StoryCard';
import logo from '../assets/logo.jpg';
import './MyStories.css';

const MyStories = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created'); // 'created' or 'contributed'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const fetchMyStories = async () => {
      try {
        setLoading(true);
        const response = await storiesAPI.getUserStories(user._id);
        setStories(response.data.stories || response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStories();
  }, [user, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const createdStories = stories.filter((story) => story.author?._id === user._id);
  const contributedStories = stories.filter((story) => story.author?._id !== user._id);

  const displayStories = activeTab === 'created' ? createdStories : contributedStories;

  return (
    <div className="my-stories-page">
      <div className="page-header">
        <h1 className="logo-text-container">
          <img src={logo} alt="EasyTales Logo" className="page-logo" />
          My Stories
        </h1>
        <p>Manage your creations and contributions</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'created' ? 'active' : ''}`}
          onClick={() => setActiveTab('created')}
        >
          Created ({createdStories.length})
        </button>
        <button
          className={`tab ${activeTab === 'contributed' ? 'active' : ''}`}
          onClick={() => setActiveTab('contributed')}
        >
          Contributed ({contributedStories.length})
        </button>
      </div>

      <div className="stories-container">
        {loading ? (
          <div className="loading">Loading stories...</div>
        ) : displayStories.length === 0 ? (
          <div className="no-stories">
            <p>
              {activeTab === 'created'
                ? "You haven't created any stories yet."
                : "You haven't contributed to any stories yet."}
            </p>
            <button className="create-button" onClick={() => navigate('/write')}>
              {activeTab === 'created' ? 'Create Your First Story' : 'Explore Stories'}
            </button>
          </div>
        ) : (
          <div className="stories-grid">
            {displayStories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default MyStories;
