import { useState } from 'react';
import './StoryForm.css';

const StoryForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    genre: initialData.genre || '',
    firstParagraph: initialData.firstParagraph || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!isEdit && !formData.firstParagraph.trim()) {
      newErrors.firstParagraph = 'First paragraph is required';
    } else if (!isEdit && formData.firstParagraph.length < 50) {
      newErrors.firstParagraph = 'First paragraph must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Story Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input ${errors.title ? 'form-input-error' : ''}`}
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a captivating title..."
          maxLength="100"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="genre" className="form-label">
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          className="form-input"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">Select a genre...</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Adventure">Adventure</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Thriller">Thriller</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          className={`form-textarea ${errors.description ? 'form-input-error' : ''}`}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your story in a few sentences..."
          rows="4"
          maxLength="500"
        />
        {errors.description && (
          <span className="form-error">{errors.description}</span>
        )}
        <span className="form-helper">
          {formData.description.length}/500 characters
        </span>
      </div>

      {!isEdit && (
        <div className="form-group">
          <label htmlFor="firstParagraph" className="form-label">
            First Paragraph *
          </label>
          <textarea
            id="firstParagraph"
            name="firstParagraph"
            className={`form-textarea ${errors.firstParagraph ? 'form-input-error' : ''}`}
            value={formData.firstParagraph}
            onChange={handleChange}
            placeholder="Start your story here..."
            rows="8"
            maxLength="2000"
          />
          {errors.firstParagraph && (
            <span className="form-error">{errors.firstParagraph}</span>
          )}
          <span className="form-helper">
            {formData.firstParagraph.length}/2000 characters
          </span>
        </div>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>⏳ {isEdit ? 'Updating...' : 'Creating...'}</>
        ) : (
          <>✨ {isEdit ? 'Update Story' : 'Create Story'}</>
        )}
      </button>
    </form>
  );
};

export default StoryForm;
