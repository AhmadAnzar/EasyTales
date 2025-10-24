import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ParagraphCard from '../components/ParagraphCard';
import ParagraphEditor from '../components/ParagraphEditor';
import SafeDemoVoting from '../components/SafeDemoVoting';
import { storiesAPI, paragraphsAPI, votesAPI } from '../services/api';
import logo from '../assets/logo.jpg';
import './Story.css';

const Story = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [story, setStory] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [userVotes, setUserVotes] = useState({});
  const [showFakeVoting, setShowFakeVoting] = useState(false);

  useEffect(() => {
    if (id) {
      loadStory();
    }
  }, [id]);

  const loadStory = async () => {
    setLoading(true);
    try {
      const response = await storiesAPI.getById(id);
      const storyData = response.data.story || response.data;
      setStory(storyData);
      setParagraphs(storyData.paragraphs || []);
    } catch (error) {
      console.error('Error loading story:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddParagraph = async (paragraphData) => {
    try {
      // Always add directly to story for real functionality
      const response = await paragraphsAPI.create({ 
        content: paragraphData.content, 
        storyId: id 
      });
      const newParagraph = response.data.paragraph || response.data;
      setParagraphs([...paragraphs, newParagraph]);
      setShowEditor(false);
      
      // Reload story to get fresh data
      loadStory();
    } catch (error) {
      console.error('Error adding paragraph:', error);
    }
  };

  const handleFakeVotingComplete = (winner) => {
    // Add the winning paragraph to the actual story
    const winnerParagraph = {
      _id: `winner-${Date.now()}`,
      content: winner.content,
      author: winner.author || { username: 'Community Winner' },
      createdAt: new Date().toISOString(),
      votesCount: (winner.votes.upvotes || 0) - (winner.votes.downvotes || 0),
    };
    
    setParagraphs(prevParagraphs => [...prevParagraphs, winnerParagraph]);
    setShowFakeVoting(false);
  };

  const handleVote = async (paragraphId, voteType) => {
    try {
      await votesAPI.vote(paragraphId, voteType);
      setUserVotes({ ...userVotes, [paragraphId]: voteType });
      // Reload story to get updated vote counts
      loadStory();
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading story...</div>;
  }

  if (!story) {
    return (
      <div className="error-container">
        <p>Story not found</p>
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    );
  }

  return (
    <div className="story-page">
      <div className="story-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Stories
        </button>
        
        <div className="story-info">
          <h1 className="story-title">{story.title}</h1>
          <p className="story-description">{story.description}</p>
          
          <div className="story-meta">
            {story.genre && (
              <span className="story-genre"><img src={logo} alt="Genre" className="genre-logo" /> {story.genre}</span>
            )}
            <span className="story-status">{story.status || 'active'}</span>
            <span className="story-author">
              by {story.author?.username || 'Anonymous'}
            </span>
          </div>
          
          <div className="story-actions">
            {!showFakeVoting && (
              <button 
                className="demo-voting-button"
                onClick={() => setShowFakeVoting(true)}
              >
                🗳️ Demo Community Voting
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Safe Demo Voting System */}
      {showFakeVoting && (
        <SafeDemoVoting 
          onComplete={handleFakeVotingComplete}
        />
      )}



      <div className="paragraphs-section">
        <div className="section-header">
          <h2>📖 Story ({paragraphs.length} paragraphs)</h2>
          {isAuthenticated && !showEditor && (
            <button
              className="add-paragraph-button"
              onClick={() => setShowEditor(true)}
            >
              + Submit Paragraph
            </button>
          )}
        </div>

        {showEditor && (
          <ParagraphEditor
            storyId={id}
            onSubmit={handleAddParagraph}
            onCancel={() => setShowEditor(false)}
          />
        )}

        <div className="paragraphs-list">
          {paragraphs.length === 0 ? (
            <div className="no-paragraphs">
              <p>No paragraphs yet. Be the first to contribute!</p>
              {isAuthenticated && !showEditor && (
                <button
                  className="add-first-paragraph"
                  onClick={() => setShowEditor(true)}
                >
                  Add First Paragraph
                </button>
              )}
            </div>
          ) : (
            paragraphs.map((paragraph) => (
              <ParagraphCard
                key={paragraph._id}
                paragraph={paragraph}
                onVote={handleVote}
                userVote={userVotes[paragraph._id]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Story;
