import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import logo from '../assets/logo.jpg';
import './StoryCard.css';

const StoryCard = ({ story }) => {
  const {
    _id,
    title,
    description,
    genre,
    createdBy,
    author,
    createdAt,
    paragraphCount = 0,
    metadata = {},
    status = 'open',
  } = story;
  
  // Accept either server-provided `author` or legacy `createdBy`
  const displayAuthor = author || createdBy;

  return (
    <Link to={`/story/${_id}`} className="story-card-link">
      <article className="story-card">
        <div className="story-card-header">
          <h2 className="story-card-title">{title}</h2>
          <span className={`story-status story-status-${status}`}>
            {status}
          </span>
        </div>

        <p className="story-card-description">
          {description || 'No description available'}
        </p>

        {genre && <span className="story-genre"><img src={logo} alt="Genre" className="genre-logo" /> {genre}</span>}

        <div className="story-card-stats">
          <span className="story-stat">
            <img src={logo} alt="" className="stat-logo" /> {paragraphCount} {paragraphCount === 1 ? 'paragraph' : 'paragraphs'}
          </span>
          <span className="story-stat">
            <img src={logo} alt="" className="stat-logo" /> {metadata?.tags?.join(', ') || 'collaborative'}
          </span>
        </div>

        <div className="story-card-footer">
          <div className="story-author">
            <img src={logo} alt="" className="author-avatar" />
            <span className="author-name">
              {displayAuthor?.username || 'Anonymous'}
            </span>
          </div>
          <span className="story-date">{formatDate(createdAt)}</span>
        </div>
      </article>
    </Link>
  );
};

export default StoryCard;
