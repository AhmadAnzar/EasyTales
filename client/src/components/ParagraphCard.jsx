import { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import VoteButton from './VoteButton';
import './ParagraphCard.css';

const ParagraphCard = ({ paragraph, onVote, userVote }) => {
  const {
    _id,
    content,
    author,
    createdAt,
    votes = { upvotes: 0, downvotes: 0 },
    position,
  } = paragraph;

  const [isExpanded, setIsExpanded] = useState(false);
  const voteScore = (votes.upvotes || 0) - (votes.downvotes || 0);

  const toggleExpand = () => {
    if (content.length > 300) {
      setIsExpanded(!isExpanded);
    }
  };

  const displayContent =
    !isExpanded && content.length > 300
      ? content.substring(0, 300) + '...'
      : content;

  return (
    <div className="paragraph-card">
      <div className="paragraph-header">
        <span className="paragraph-position">#{position}</span>
        <div className="paragraph-author-info">
          <span className="paragraph-author-avatar">👤</span>
          <div>
            <span className="paragraph-author-name">
              {author?.username || 'Anonymous'}
            </span>
            <span className="paragraph-date">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="paragraph-content">
        <p className="paragraph-text">{displayContent}</p>
        {content.length > 300 && (
          <button className="paragraph-toggle" onClick={toggleExpand}>
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="paragraph-footer">
        <VoteButton
          paragraphId={_id}
          onVote={onVote}
          userVote={userVote}
          voteScore={voteScore}
        />
        <div className="paragraph-stats">
          <span className="paragraph-stat">
            👍 {votes.upvotes || 0}
          </span>
          <span className="paragraph-stat">
            👎 {votes.downvotes || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParagraphCard;
