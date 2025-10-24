import logo from '../assets/logo.jpg';
import './DemoInstructions.css';

const DemoInstructions = ({ onClose }) => {
  return (
    <div className="demo-instructions-overlay">
      <div className="demo-instructions-modal">
        <div className="demo-header">
          <h2>🗳️ Community Voting Demo</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="demo-content">
          <div className="demo-step">
            <span className="step-number">1</span>
            <div className="step-info">
              <h3>Submission Phase (2 minutes)</h3>
              <p>Watch as community members submit their paragraph contributions randomly. Each submission appears with realistic timing intervals.</p>
            </div>
          </div>
          
          <div className="demo-step">
            <span className="step-number">2</span>
            <div className="step-info">
              <h3>Voting Phase (1 minute)</h3>
              <p>See live voting in action! Votes are cast automatically on submitted paragraphs, with scores updating in real-time.</p>
            </div>
          </div>
          
          <div className="demo-step">
            <span className="step-number">3</span>
            <div className="step-info">
              <h3>Winner Selection</h3>
              <p>The paragraph with the highest score wins and gets automatically added to the story. The system resets for the next round.</p>
            </div>
          </div>
          
          <div className="demo-features">
            <h3>✨ Demo Features</h3>
            <ul>
              <li>🎭 Realistic fake usernames and avatars</li>
              <li>📝 Pre-written engaging paragraph content</li>
              <li>⏰ Real-time countdown timers</li>
              <li>🔄 Live vote count updates</li>
              <li>🏆 Winner announcement animations</li>
              <li className="logo-text-container"><img src={logo} alt="Feature" className="demo-logo" /> Automatic story integration</li>
            </ul>
          </div>
        </div>
        
        <div className="demo-footer">
          <button onClick={onClose} className="start-demo-button">
            Got it, Start Demo!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoInstructions;