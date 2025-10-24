import { useState } from 'react';
import { aiAPI } from '../services/api';
import './AISuggestButton.css';

const AISuggestButton = ({ storyId, onSuggestion }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuggest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Send story context to AI for suggestion
      const response = await aiAPI.generate(storyId, 'Please continue this story with an engaging paragraph.');
      
      // Handle different response formats
      let suggestion = '';
      if (response.data?.suggestion) {
        suggestion = response.data.suggestion;
      } else if (response.data?.text) {
        suggestion = response.data.text;
      } else if (response.data?.choices?.[0]?.message?.content) {
        suggestion = response.data.choices[0].message.content.trim();
      } else if (typeof response.data === 'string') {
        suggestion = response.data;
      } else {
        // Default fallback
        suggestion = 'The story continues with new adventures and unexpected twists...';
      }
      
      if (onSuggestion) {
        onSuggestion(suggestion);
      }
    } catch (err) {
      console.error('AI suggestion error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'AI suggestion failed';
      
      // Always provide a fallback suggestion to keep the experience smooth
      const fallbackSuggestions = [
        'The protagonist paused, sensing that something important was about to happen...',
        'As the sun set behind the horizon, a new chapter of the adventure was about to begin...',
        'With courage in their heart, they stepped forward into the unknown...',
        'The wind whispered secrets that would change everything...',
        'In that moment, they realized that their journey was far from over...'
      ];
      
      const randomSuggestion = fallbackSuggestions[Math.floor(Math.random() * fallbackSuggestions.length)];
      
      if (onSuggestion) {
        onSuggestion(randomSuggestion);
      }
      
      // Show a user-friendly error message
      setError('AI is taking a creative break! Used a backup suggestion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-suggest-container">
      <button
        type="button"
        className="ai-suggest-button"
        onClick={handleSuggest}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="ai-icon spinning">🤖</span>
            Thinking...
          </>
        ) : (
          <>
            <span className="ai-icon">✨</span>
            AI Suggest
          </>
        )}
      </button>
      {error && <span className="ai-suggest-error">{error}</span>}
    </div>
  );
};

export default AISuggestButton;
