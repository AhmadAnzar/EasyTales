import { useEffect, useState } from 'react';
import { useTimer, PHASES } from '../context/TimerContext';
import PendingParagraph from './PendingParagraph';
import VotingTimer from './VotingTimer';
import './FakeVotingSystem.css';

const FakeVotingSystem = ({ storyId, onComplete }) => {
  const { storyTimers, initializeTimer, addWinnerToStory } = useTimer();
  const [isActive, setIsActive] = useState(false);
  const [showWinner, setShowWinner] = useState(false);

  const timer = storyTimers[storyId];

  useEffect(() => {
    if (!timer && isActive) {
      initializeTimer(storyId);
    }
  }, [storyId, timer, isActive, initializeTimer]);

  useEffect(() => {
    if (timer && timer.phase === PHASES.COMPLETED && timer.winner && !showWinner) {
      setShowWinner(true);
      
      // Auto-add winner to story after 3 seconds
      const timeout = setTimeout(() => {
        setShowWinner(false);
        setIsActive(false);
        if (onComplete) {
          onComplete(timer.winner);
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [timer, storyId, onComplete, showWinner]);

  const handleStartVoting = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setShowWinner(false);
  };

  if (!isActive) {
    return (
      <div className="fake-voting-system inactive">
        <div className="voting-prompt">
          <h3>🗳️ Start Community Voting Round</h3>
          <p>
            Begin a simulated voting session where the community submits and votes on 
            the next paragraph for this story.
          </p>
          <button onClick={handleStartVoting} className="start-voting-btn">
            Start Voting Session
          </button>
        </div>
      </div>
    );
  }

  if (showWinner && timer?.winner) {
    return (
      <div className="fake-voting-system winner-announcement">
        <div className="winner-container">
          <div className="winner-header">
            <h3>🏆 Winning Paragraph Selected!</h3>
            <p>The community has chosen this paragraph to continue the story:</p>
          </div>
          
          <div className="winner-content">
            <div className="winner-paragraph">
              <div className="winner-author">
                <span className="author-avatar">👤</span>
                <span className="author-name">{timer.winner.author.username}</span>
              </div>
              <p className="winner-text">{timer.winner.content}</p>
              <div className="winner-stats">
                <span className="vote-count">
                  👍 {timer.winner.votes.upvotes} 👎 {timer.winner.votes.downvotes}
                </span>
                <span className="final-score">
                  Final Score: +{(timer.winner.votes.upvotes || 0) - (timer.winner.votes.downvotes || 0)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="winner-message">
            <p>✨ Adding paragraph to story...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fake-voting-system active">
      <div className="voting-header">
        <VotingTimer storyId={storyId} />
        
        <div className="voting-controls">
          <button onClick={handleStop} className="stop-voting-btn">
            Stop Session
          </button>
        </div>
      </div>

      <div className="submissions-container">
        <div className="submissions-header">
          <h4>
            {timer?.phase === PHASES.SUBMISSION && '📝 Live Submissions'}
            {timer?.phase === PHASES.VOTING && '🗳️ Vote for Your Favorite'}
            {timer?.phase === PHASES.COMPLETED && '✅ Voting Complete'}
          </h4>
          <span className="submission-count">
            {timer?.submissions?.length || 0} paragraph{timer?.submissions?.length !== 1 ? 's' : ''} submitted
          </span>
        </div>

        <div className="submissions-list">
          {timer?.submissions?.map((submission) => (
            <PendingParagraph
              key={submission.id}
              storyId={storyId}
              submission={submission}
            />
          ))}
          
          {timer?.phase === PHASES.SUBMISSION && (
            <div className="waiting-for-submissions">
              <div className="submission-placeholder">
                <div className="pulse-animation"></div>
                <p>Waiting for community submissions...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FakeVotingSystem;