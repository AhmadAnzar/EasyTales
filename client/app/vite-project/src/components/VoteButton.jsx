import { useState } from 'react';
import './VoteButton.css';

const VoteButton = ({ paragraphId, onVote, userVote, voteScore = 0 }) => {
  const [currentVote, setCurrentVote] = useState(userVote || null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType) => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      // Convert vote type to numeric value for API
      let voteValue;
      if (currentVote === voteType) {
        // If clicking same vote, remove it (this is handled by toggling)
        voteValue = voteType === 1 ? -1 : 1; // Toggle to opposite
      } else {
        voteValue = voteType;
      }
      
      if (onVote) {
        await onVote(paragraphId, voteValue);
      }
      
      setCurrentVote(voteType);
    } catch (error) {
      console.error('Vote error:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="vote-button-container">
      <button
        className={`vote-button vote-up ${currentVote === 1 ? 'active' : ''}`}
        onClick={() => handleVote(1)}
        disabled={isVoting}
        aria-label="Upvote"
      >
        <span className="vote-icon">👍</span>
      </button>

      <span className={`vote-score ${voteScore > 0 ? 'positive' : voteScore < 0 ? 'negative' : ''}`}>
        {voteScore > 0 ? '+' : ''}{voteScore}
      </span>

      <button
        className={`vote-button vote-down ${currentVote === -1 ? 'active' : ''}`}
        onClick={() => handleVote(-1)}
        disabled={isVoting}
        aria-label="Downvote"
      >
        <span className="vote-icon">👎</span>
      </button>
    </div>
  );
};

export default VoteButton;
