import { useEffect, useState } from 'react';
import { useTimer, PHASES } from '../context/TimerContext';
import './VotingTimer.css';

const VotingTimer = ({ storyId }) => {
  const { storyTimers, getRemainingTime } = useTimer();
  const [remainingTime, setRemainingTime] = useState(0);

  const timer = storyTimers[storyId];

  useEffect(() => {
    if (!timer) return;

    const updateTimer = () => {
      setRemainingTime(getRemainingTime(storyId));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [storyId, timer, getRemainingTime]);

  if (!timer) return null;

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  const getPhaseInfo = () => {
    switch (timer.phase) {
      case PHASES.SUBMISSION:
        return {
          title: '📝 Submission Phase',
          description: 'Write your paragraph and submit!',
          color: '#667eea',
        };
      case PHASES.VOTING:
        return {
          title: '🗳️ Voting Phase',
          description: 'Vote for your favorite paragraph!',
          color: '#f5576c',
        };
      case PHASES.COMPLETED:
        return {
          title: '✅ Voting Completed',
          description: 'Winner has been selected!',
          color: '#48bb78',
        };
      default:
        return {
          title: '',
          description: '',
          color: '#718096',
        };
    }
  };

  const phaseInfo = getPhaseInfo();
  const percentage = timer.phase === PHASES.SUBMISSION
    ? (remainingTime / (10 * 60 * 1000)) * 100
    : timer.phase === PHASES.VOTING
    ? (remainingTime / (5 * 60 * 1000)) * 100
    : 0;

  return (
    <div className="voting-timer">
      <div className="timer-header">
        <h3 className="timer-title" style={{ color: phaseInfo.color }}>
          {phaseInfo.title}
        </h3>
        <p className="timer-description">{phaseInfo.description}</p>
      </div>

      {timer.phase !== PHASES.COMPLETED && (
        <div className="timer-body">
          <div className="timer-display">
            <span className="timer-number">
              {String(minutes).padStart(2, '0')}
            </span>
            <span className="timer-separator">:</span>
            <span className="timer-number">
              {String(seconds).padStart(2, '0')}
            </span>
          </div>

          <div className="timer-progress-bar">
            <div
              className="timer-progress-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: phaseInfo.color,
              }}
            />
          </div>

          <div className="timer-stats">
            <div className="timer-stat">
              <span className="stat-label">Phase:</span>
              <span className="stat-value">
                {timer.phase === PHASES.SUBMISSION ? 'Submission' : 'Voting'}
              </span>
            </div>
            {timer.phase === PHASES.VOTING && (
              <div className="timer-stat">
                <span className="stat-label">Submissions:</span>
                <span className="stat-value">{timer.submissions.length}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {timer.phase === PHASES.COMPLETED && timer.winner && (
        <div className="timer-winner">
          <p className="winner-label">🏆 Winning Paragraph Added!</p>
          <div className="winner-preview">
            {timer.winner.content.substring(0, 100)}...
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingTimer;
