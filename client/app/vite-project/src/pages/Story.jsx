import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTimer, PHASES } from '../context/TimerContext';
import ParagraphCard from '../components/ParagraphCard';
import ParagraphEditor from '../components/ParagraphEditor';
import VotingTimer from '../components/VotingTimer';
import PendingParagraph from '../components/PendingParagraph';
import { mockAPI } from '../hooks/useMockData';
import './Story.css';

const Story = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { storyTimers, initializeTimer, addSubmission } = useTimer();
  const [story, setStory] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [userVotes, setUserVotes] = useState({});

  const timer = storyTimers[id];

  useEffect(() => {
    if (id) {
      loadStory();
      // Initialize timer if not exists
      if (!storyTimers[id]) {
        initializeTimer(id);
      }
    }
  }, [id]);

  // When voting completes and winner is selected, add it to paragraphs
  useEffect(() => {
    if (timer?.phase === PHASES.COMPLETED && timer.winner && !timer.winnerAdded) {
      const winnerParagraph = {
        _id: timer.winner.id,
        content: timer.winner.content,
        author: timer.winner.author || { username: 'Anonymous' },
        createdAt: new Date().toISOString(),
        votes: timer.winner.votes,
        position: paragraphs.length + 1,
      };
      setParagraphs([...paragraphs, winnerParagraph]);
      // Mark as added to prevent duplicates
      timer.winnerAdded = true;
    }
  }, [timer?.phase, timer?.winner]);

  const loadStory = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getStory(id);
      setStory(data);
      setParagraphs(data.paragraphs || []);
    } catch (error) {
      console.error('Error loading story:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddParagraph = async (paragraphData) => {
    try {
      // During submission phase, add to pending submissions
      if (timer?.phase === PHASES.SUBMISSION) {
        addSubmission(id, {
          content: paragraphData.content,
          author: user || { username: 'Anonymous' },
        });
        setShowEditor(false);
      } else {
        // If no timer active, add directly (fallback)
        const newParagraph = await mockAPI.addParagraph(id, paragraphData.content);
        setParagraphs([...paragraphs, newParagraph]);
        setShowEditor(false);
      }
    } catch (error) {
      console.error('Error adding paragraph:', error);
    }
  };

  const handleVote = async (paragraphId, voteType) => {
    try {
      await mockAPI.voteParagraph(paragraphId, voteType);
      setUserVotes({ ...userVotes, [paragraphId]: voteType });
      // Update local vote count
      setParagraphs(paragraphs.map(p => {
        if (p._id === paragraphId) {
          const votes = { ...p.votes };
          if (voteType === 'upvote') {
            votes.upvotes += 1;
          } else {
            votes.downvotes += 1;
          }
          return { ...p, votes };
        }
        return p;
      }));
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
              <span className="story-genre">📚 {story.genre}</span>
            )}
            <span className="story-status">{story.status || 'active'}</span>
            <span className="story-author">
              by {story.author?.username || 'Anonymous'}
            </span>
          </div>
        </div>
      </div>

      {/* Timer and Voting Section */}
      {timer && (
        <VotingTimer storyId={id} />
      )}

      {/* Pending Submissions Section */}
      {timer && timer.submissions.length > 0 && (
        <div className="pending-section">
          <div className="section-header">
            <h2>
              {timer.phase === PHASES.SUBMISSION ? '📝 Current Submissions' : '🗳️ Vote for Your Favorite!'}
            </h2>
            <span className="pending-count">
              {timer.submissions.length} {timer.submissions.length === 1 ? 'submission' : 'submissions'}
            </span>
          </div>
          
          <div className="pending-list">
            {timer.submissions.map((submission) => (
              <PendingParagraph
                key={submission.id}
                storyId={id}
                submission={submission}
              />
            ))}
          </div>
        </div>
      )}

      <div className="paragraphs-section">
        <div className="section-header">
          <h2>📖 Story ({paragraphs.length} paragraphs)</h2>
          {isAuthenticated && !showEditor && timer?.phase === PHASES.SUBMISSION && (
            <button
              className="add-paragraph-button"
              onClick={() => setShowEditor(true)}
            >
              + Submit Paragraph
            </button>
          )}
        </div>

        {showEditor && timer?.phase === PHASES.SUBMISSION && (
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
