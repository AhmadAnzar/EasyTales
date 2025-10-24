import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './Landing.css';

// TypewriterText component removed - now using instant text display

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="music-player">
      <button onClick={toggleMusic} className="music-toggle">
        {isPlaying ? '🔊' : '🔇'}
      </button>
      <audio ref={audioRef} loop>
        {/* <source src="/path/to/music.mp3" type="audio/mpeg" /> */}
      </audio>
    </div>
  );
};

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [visibleBubbles, setVisibleBubbles] = useState([]);
  
  // --- NEW STATE FOR SCROLL DIRECTION & CTA ---
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const bubbles = [
    {
      id: 1,
      text: "Once upon a time, writers from around the world gathered to create something magical...",
      side: 'first' // Left
    },
    {
      id: 2,
      text: "They crafted paragraphs, voted on brilliant ideas, and watched stories evolve into beautiful tales.",
      side: 'second' // Right
    },
    {
      id: 3,
      text: "Each story became a masterpiece, born from collaboration and shared creativity.",
      side: 'third' // Left
    },
    {
      id: 4,
      text: "Now it's your turn to join this enchanting community of storytellers...",
      side: 'fourth', // Right
      isCTA: true
    }
  ];

  useEffect(() => {
    if (isAuthenticated) navigate('/home');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      
      // --- SCROLL DIRECTION LOGIC ---
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      const trigger3 = 3 * (windowH / 2.2); // Trigger point after bubble 3

      // Show bubbles 1-3 based on their position
      bubbles.forEach((bubble, i) => {
        if (bubble.isCTA) return; // Ignore CTA bubble here
        
        const trigger = (i + 1) * (windowH / 10);
        if (scrollY >= trigger && !visibleBubbles.includes(bubble.id)) {
          setVisibleBubbles(prev => [...prev, bubble.id]);
        }
      });
      
      // Show CTA when all story bubbles (1, 2, 3) are visible
      if (visibleBubbles.includes(1) && visibleBubbles.includes(2) && visibleBubbles.includes(3)) {
        setIsCtaVisible(true);
      }

      // Hide scroll hint when near bottom of page
      const isNearBottom = (window.innerHeight + scrollY) >= (document.body.offsetHeight - 100);
      setShowScrollHint(!isNearBottom);

      setLastScrollY(scrollY <= 0 ? 0 : scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  // We remove visibleBubbles from dependency array to prevent re-triggering,
  // but keep lastScrollY to ensure state is up-to-date.
  }, [lastScrollY, bubbles]); 

  return (
    <div className="story-trail-landing">
      <NavBar />
      <MusicPlayer />
      <div className="brand-header">
        <h1 className="brand-title">EasyTales</h1>
        <p className="brand-subtitle">Where Stories Come to Life</p>
      </div>

      <div className="story-trail">
        {bubbles.map((bubble, i) => (
          <div key={bubble.id} className="bubble-section">
            
            {/* --- UPDATED RENDER LOGIC --- */}
            {/* Render bubbles 1-3 */}
            {!bubble.isCTA && visibleBubbles.includes(bubble.id) && (
              <div className={`story-bubble ${bubble.side}`}>
                <div className="bubble-content">
                  <p>{bubble.text}</p>
                </div>
              </div>
            )}
            
            {/* Render CTA bubble (bubble 4) based on new logic */}
            {bubble.isCTA && isCtaVisible && (
              <div className={`story-bubble ${bubble.side} cta-bubble`}>
                <div className="bubble-content">
                  <p>{bubble.text}</p>
                  <div className="cta-section">
                    <Link to="/signup" className="story-cta">
                      <span>Start Your Story</span>
                      <span className="cta-icon"></span>
                    </Link>
                    <p className="signin-text">
                      Already have an account? <Link to="/signin">Continue your tale</Link>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* --- ARROWS --- */}
            {/* Only show arrows for non-CTA bubbles that are visible */}
            {!bubble.isCTA && i < bubbles.length - 1 && visibleBubbles.includes(bubble.id) && (
              <div className={`arrow-path ${bubble.side}`}>
                {/* --- FIXED SVG VIEWBOX AND PATH --- */}
                <svg className="path-svg" viewBox="0 0 300 400">
                  <defs>
                    <marker id={`arrowhead-${i}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#a0522d" />
                    </marker>
                  </defs>
                  <path
                    className="dashed-path"
                    d={
                      bubble.side === 'first' || bubble.side === 'third'
                        ? "M 20,20 Q 150,100 280,380" // Left-to-Right
                        : "M 280,20 Q 150,100 20,380" // Right-to-Left
                    }
                    fill="none"
                    stroke="#a0522d"
                    strokeWidth="2.5"
                    strokeDasharray="6,6"
                    markerEnd={`url(#arrowhead-${i})`}
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
        
        {/* --- STATS SECTION TIED TO CTA VISIBILITY --- */}
        {isCtaVisible && (
          <div className="story-stats">
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Stories Born</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Writers</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Chapters</span>
            </div>
          </div>
        )}
      </div>

      {showScrollHint && (
        <div className="scroll-hint">
          <span>Scroll to discover the story</span>
          <div className="scroll-arrow">↓</div>
        </div>
      )}
    </div>
  );
};

export default Landing;