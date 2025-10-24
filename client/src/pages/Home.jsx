import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import SearchBar from '../components/SearchBar';
import { storiesAPI } from '../services/api';
import logo from '../assets/logo.jpg';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    try {
      const response = await storiesAPI.getAll();
      setStories(response.data.stories || response.data);
    } catch (error) {
      console.error('Error loading stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const response = await storiesAPI.getAll({ search: query });
      setStories(response.data.stories || response.data);
    } catch (error) {
      console.error('Error searching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStories = stories.filter((story) => {
    if (filter === 'active') return story.status === 'open';
    if (filter === 'completed') return story.status === 'closed';
    return true;
  });

  const handlePrevious = () => {
    setCurrentStoryIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStoryIndex((prev) => Math.min(filteredStories.length - 1, prev + 1));
  };

  // Reset index when filter changes
  useEffect(() => {
    setCurrentStoryIndex(0);
  }, [filter, searchQuery]);

  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">
          <img src={logo} alt="EasyTales Logo" className="hero-logo" />
          Welcome to EasyTales
        </h1>
        <p className="hero-subtitle">
          Collaborate with writers worldwide to create amazing stories, one paragraph at a time.
        </p>
        {isAuthenticated && (
          <Link to="/write" className="hero-cta">
            Start Writing
          </Link>
        )}
      </section>

      <section className="search-section">
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="filter-section">
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Stories
          </button>
          <button
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </section>

      <section className="stories-section">
        {loading ? (
          <div className="loading">Loading stories...</div>
        ) : filteredStories.length === 0 ? (
          <div className="no-stories">
            <p>No stories found. Be the first to create one!</p>
            {isAuthenticated && (
              <Link to="/write" className="create-story-link">
                Create Story
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="stories-grid">
              <div 
                className="story-carousel"
                style={{
                  transform: `translateX(-${currentStoryIndex * 100}%)`
                }}
              >
                {filteredStories.map((story) => (
                  <div key={story._id} className="story-card-slide">
                    <StoryCard story={story} />
                  </div>
                ))}
              </div>
            </div>
            
            {filteredStories.length > 1 && (
              <div className="stories-navigation">
                <button 
                  className="nav-button" 
                  onClick={handlePrevious}
                  disabled={currentStoryIndex === 0}
                >
                  ← Previous
                </button>
                
                <div className="story-counter">
                  {currentStoryIndex + 1} of {filteredStories.length}
                </div>
                
                <button 
                  className="nav-button" 
                  onClick={handleNext}
                  disabled={currentStoryIndex === filteredStories.length - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

    </div>
  );
};

export default Home;