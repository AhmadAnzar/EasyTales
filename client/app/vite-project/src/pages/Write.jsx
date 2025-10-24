import { useNavigate } from 'react-router-dom';
import { useStory } from '../context/StoryContext';
import { useAuth } from '../context/AuthContext';
import StoryForm from '../components/StoryForm';
import { useEffect } from 'react';
import './Write.css';

const Write = () => {
  const { createStory, addParagraph } = useStory();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const storyData = {
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        firstParagraph: formData.firstParagraph,
      };

      const result = await createStory(storyData);
      
      if (result.success) {
        // Navigate to the new story (first paragraph is created by the server)
        navigate(`/story/${result.data._id}`);
      }
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="write-page">
      <div className="write-header">
        <h1 className="page-title">✍️ Create Your Story</h1>
        <p className="page-subtitle">
          Start a new collaborative story and invite the community to contribute!
        </p>
      </div>

      <StoryForm onSubmit={handleSubmit} />

      <div className="writing-tips">
        <h3>💡 Writing Tips</h3>
        <ul>
          <li>Create an engaging opening that hooks readers</li>
          <li>Leave room for other writers to build on your ideas</li>
          <li>Be clear about the genre and tone</li>
          <li>Keep paragraphs focused and impactful</li>
          <li>Respect the collaborative nature of the platform</li>
        </ul>
      </div>

    </div>
  );
};

export default Write;
