import { useState } from 'react';
import AISuggestButton from './AISuggestButton';
import './ParagraphEditor.css';

const ParagraphEditor = ({ storyId, onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateContent = () => {
    if (!content.trim()) {
      setErrors('Paragraph content is required');
      return false;
    }
    if (content.length < 50) {
      setErrors('Paragraph must be at least 50 characters');
      return false;
    }
    setErrors('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateContent()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ storyId, content });
      setContent(''); // Clear on success
    } catch (error) {
      console.error('Submit error:', error);
      setErrors('Failed to add paragraph');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAISuggestion = (suggestion) => {
    setContent(suggestion);
    setErrors('');
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    if (errors) {
      setErrors('');
    }
  };

  return (
    <form className="paragraph-editor" onSubmit={handleSubmit}>
      <div className="editor-header">
        <h3 className="editor-title">✍️ Add Your Paragraph</h3>
        <AISuggestButton storyId={storyId} onSuggestion={handleAISuggestion} />
      </div>

      <div className="editor-body">
        <textarea
          className={`editor-textarea ${errors ? 'editor-textarea-error' : ''}`}
          value={content}
          onChange={handleChange}
          placeholder="Continue the story... Be creative and engaging!"
          rows="8"
          maxLength="2000"
        />
        {errors && <span className="editor-error">{errors}</span>}
        <span className="editor-helper">
          {content.length}/2000 characters
          {content.length >= 50 && (
            <span className="editor-helper-success"> ✓ Minimum met</span>
          )}
        </span>
      </div>

      <div className="editor-actions">
        {onCancel && (
          <button
            type="button"
            className="editor-button editor-button-cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="editor-button editor-button-submit"
          disabled={isSubmitting || content.length < 50}
        >
          {isSubmitting ? '⏳ Submitting...' : '📝 Add Paragraph'}
        </button>
      </div>
    </form>
  );
};

export default ParagraphEditor;
