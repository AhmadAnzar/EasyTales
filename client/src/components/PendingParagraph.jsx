import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTimer, PHASES } from '../context/TimerContext';
import { formatDate } from '../utils/formatDate';
import './PendingParagraph.css';

const PendingParagraph = ({ storyId, submission }) => {
  const { user } = useAuth();
  const { voteOnSubmission, storyTimers } = useTimer();
  const [userVote, setUserVote] = useState(null);
  const [animateVotes, setAnimateVotes] = useState(false);

  const timer = storyTimers[storyId];
  const isVotingPhase = timer?.phase === PHASES.VOTING;
  const isCompleted = timer?.phase === PHASES.COMPLETED;

  // Animate vote changes during voting phase
  useEffect(() => {
    if (isVotingPhase) {
      setAnimateVotes(true);
      const timeout = setTimeout(() => setAnimateVotes(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [submission.votes, isVotingPhase]);

  const handleVote = (voteType) => {
    if (!isVotingPhase) return;

    voteOnSubmission(storyId, submission.id, voteType);
    setUserVote(voteType);
  };

  const netVotes = (submission.votes.upvotes || 0) - (submission.votes.downvotes || 0);
  const isWinner = isCompleted && timer?.winner?.id === submission.id;

  return (
    <div className={`pending-paragraph ${isVotingPhase ? 'voting-active' : ''} ${isWinner ? 'winner' : ''} ${animateVotes ? 'vote-animation' : ''}`}>
      <div className="pending-header">
        <div className="pending-author-info">
          <span className="pending-author-avatar">👤</span>
          <div>
            <span className="pending-author-name">
              {submission.author?.username || 'Anonymous'}
            </span>
            <span className="pending-date">{formatDate(submission.createdAt)}</span>
          </div>
        </div>

        <div className="pending-badges">
          {isWinner && <span className="pending-badge winner-badge">🏆 Winner</span>}
          {!isVotingPhase && !isCompleted && (
            <span className="pending-badge">⏳ Waiting for voting</span>
          )}
          {isVotingPhase && (
            <span className="pending-badge voting-badge">🗳️ Voting live</span>
          )}
        </div>
      </div>

      <div className="pending-content">
        <p className="pending-text">{submission.content}</p>
      </div>

      <div className="pending-footer">
        {isVotingPhase ? (
          <div className="pending-voting">
            <button
              className={`vote-btn vote-up ${userVote === 'upvote' ? 'active' : ''}`}
              onClick={() => handleVote('upvote')}
            >
              <span className="vote-icon">👍</span>
              <span className="vote-count">{submission.votes.upvotes || 0}</span>
            </button>

            <div className={`vote-score ${netVotes > 0 ? 'positive' : netVotes < 0 ? 'negative' : ''}`}>
              <span className="score-value">
                {netVotes > 0 ? '+' : ''}{netVotes}
              </span>
              <span className="score-label">score</span>
            </div>

            <button
              className={`vote-btn vote-down ${userVote === 'downvote' ? 'active' : ''}`}
              onClick={() => handleVote('downvote')}
            >
              <span className="vote-icon">👎</span>
              <span className="vote-count">{submission.votes.downvotes || 0}</span>
            </button>
          </div>
        ) : (
          <div className="pending-stats">
            <span className="pending-stat">
              Submitted • Voting opens soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingParagraph;
