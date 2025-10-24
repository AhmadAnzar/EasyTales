import { useState } from 'react';
import './SimpleFakeVoting.css';

const DEMO_PARAGRAPHS = [
  {
    id: 1,
    content: "The ancient door creaked open, revealing a spiral staircase that descended into darkness. Sarah hesitated for a moment before taking the first step down.",
    author: "StoryWeaver92",
    votes: 0
  },
  {
    id: 2,
    content: "With her heart pounding, Sarah called out to her companions above, but only silence answered. The musty air grew colder with each step down.",
    author: "MysteryWriter",
    votes: 0
  },
  {
    id: 3,
    content: "As Sarah reached the bottom, she found herself in a vast underground chamber filled with ancient artifacts and a glowing crystal in the center.",
    author: "AdventureSeeker",
    votes: 0
  }
];

const SimpleFakeVoting = ({ onComplete, storyId }) => {
  const [phase, setPhase] = useState('waiting'); // waiting, submission, voting, complete
  const [paragraphs, setParagraphs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [winner, setWinner] = useState(null);

  const startDemo = () => {
    setPhase('submission');
    setTimeLeft(120); // 2 minutes
    setParagraphs([]);
    setWinner(null);

    // Add paragraphs gradually
    let addedCount = 0;
    const addInterval = setInterval(() => {
      if (addedCount < DEMO_PARAGRAPHS.length) {
        setParagraphs(prev => [...prev, { ...DEMO_PARAGRAPHS[addedCount], votes: 0 }]);
        addedCount++;
      } else {
        clearInterval(addInterval);
      }
    }, 15000); // Add one every 15 seconds

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          clearInterval(addInterval);
          startVoting();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startVoting = () => {
    setPhase('voting');
    setTimeLeft(60); // 1 minute

    // Simulate voting
    const voteInterval = setInterval(() => {
      setParagraphs(prev => 
        prev.map(p => ({
          ...p,
          votes: p.votes + Math.floor(Math.random() * 3)
        }))
      );
    }, 2000);

    // End voting
    const endTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(endTimer);
          clearInterval(voteInterval);
          endVoting();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endVoting = () => {
    const winningParagraph = paragraphs.reduce((max, p) => 
      p.votes > max.votes ? p : max, paragraphs[0]
    );
    
    setWinner(winningParagraph);
    setPhase('complete');

    // Auto complete after 3 seconds
    setTimeout(() => {
      if (onComplete) {
        onComplete(winningParagraph);
      }
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (phase === 'waiting') {
    return (
      <div className="simple-fake-voting">
        <div className="demo-start">
          <h3>🗳️ Demo Community Voting</h3>
          <p>Experience how collaborative storytelling works!</p>
          <button onClick={startDemo} className="start-button">
            Start Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-fake-voting active">
      <div className="demo-header">
        <h3>
          {phase === 'submission' && '📝 Submission Phase'}
          {phase === 'voting' && '🗳️ Voting Phase'}
          {phase === 'complete' && '🏆 Winner Selected'}
        </h3>
        <div className="timer">{formatTime(timeLeft)}</div>
      </div>

      {phase === 'complete' && winner && (
        <div className="winner-announcement">
          <h4>🏆 Winning Paragraph</h4>
          <div className="winner-card">
            <p>"{winner.content}"</p>
            <div className="winner-info">
              <span>by {winner.author}</span>
              <span>{winner.votes} votes</span>
            </div>
          </div>
        </div>
      )}

      <div className="paragraphs-container">
        {paragraphs.map((paragraph) => (
          <div 
            key={paragraph.id} 
            className={`paragraph-card ${winner?.id === paragraph.id ? 'winner' : ''}`}
          >
            <p>"{paragraph.content}"</p>
            <div className="paragraph-footer">
              <span className="author">by {paragraph.author}</span>
              <span className="votes">Votes: {paragraph.votes}</span>
            </div>
          </div>
        ))}
      </div>

      {(phase === 'submission' || phase === 'voting') && (
        <div className="demo-info">
          {phase === 'submission' && (
            <p>✨ Community members are submitting their paragraph ideas...</p>
          )}
          {phase === 'voting' && (
            <p>🗳️ Live voting in progress! Watch the scores update...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleFakeVoting;