import { useState } from 'react';

const SafeDemoVoting = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0);
  
  const demoSteps = [
    "📝 Community members submit paragraphs...",
    "🗳️ Voting begins on submitted paragraphs...", 
    "🏆 Winner selected and added to story!"
  ];

  const handleStart = () => {
    setIsActive(true);
    setStep(0);
    
    // Simple sequential demo without timers
    setTimeout(() => setStep(1), 2000);
    setTimeout(() => setStep(2), 4000);
    setTimeout(() => {
      setIsActive(false);
      setStep(0);
      if (onComplete) {
        onComplete({
          content: "The winning paragraph has been added to your story!",
          author: { username: "CommunityWinner" }
        });
      }
    }, 6000);
  };

  if (!isActive) {
    return (
      <div style={{
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
        margin: '20px 0'
      }}>
        <h3>🗳️ Demo Community Voting</h3>
        <p>See how collaborative voting works!</p>
        <button 
          onClick={handleStart}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Start Safe Demo
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #667eea',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '20px 0',
      background: '#f8f9fa'
    }}>
      <h3>Demo in Progress...</h3>
      <p>{demoSteps[step]}</p>
      <div style={{
        width: '100%',
        height: '4px',
        background: '#ddd',
        borderRadius: '2px',
        margin: '10px 0'
      }}>
        <div style={{
          width: `${((step + 1) / 3) * 100}%`,
          height: '100%',
          background: '#667eea',
          borderRadius: '2px',
          transition: 'width 0.5s ease'
        }}></div>
      </div>
    </div>
  );
};

export default SafeDemoVoting;