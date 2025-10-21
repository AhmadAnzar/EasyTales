import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStory } from '../context/StoryContext';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { stories, fetchStories, loading } = useStory();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In real app, this would trigger API call with search params
    fetchStories({ search: query });
  };

  const filteredStories = stories.filter((story) => {
    if (filter === 'active') return story.status === 'active';
    if (filter === 'completed') return story.status === 'completed';
    return true;
  });

  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">📚 Welcome to EasyTales</h1>
        <p className="hero-subtitle">
          Collaborate with writers worldwide to create amazing stories, one paragraph at a time.
        </p>
        {isAuthenticated && (
          <Link to="/write" className="hero-cta">
            ✍️ Start Writing
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
          <div className="stories-grid">
            {filteredStories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}
      </section>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 3rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          color: white;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        .hero-cta {
          display: inline-block;
          background: white;
          color: #667eea;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s;
        }

        .hero-cta:hover {
          transform: translateY(-2px);
        }

        .search-section {
          margin-bottom: 2rem;
        }

        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-button {
          padding: 0.5rem 1.5rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .filter-button:hover {
          border-color: #667eea;
        }

        .filter-button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .loading,
        .no-stories {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .create-story-link {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .stories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
