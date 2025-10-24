import { createContext, useContext, useState, useCallback } from 'react';
import { storiesAPI, paragraphsAPI } from '../services/api';

const StoryContext = createContext();

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within StoryProvider');
  }
  return context;
};

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all stories with optional filters
  const fetchStories = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storiesAPI.getAll(filters);
      setStories(response.data.stories || response.data);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch stories';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single story by ID
  const fetchStory = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storiesAPI.getById(id);
      setCurrentStory(response.data.story || response.data);
      return { success: true, data: response.data.story || response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch story';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch paragraphs for a story
  const fetchParagraphs = useCallback(async (storyId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await paragraphsAPI.getByStory(storyId);
      setParagraphs(response.data.paragraphs || response.data);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch paragraphs';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new story
  const createStory = useCallback(async (storyData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storiesAPI.create(storyData);
      const newStory = response.data.story || response.data;
      setStories((prev) => [newStory, ...prev]);
      return { success: true, data: newStory };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create story';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a paragraph to a story
  const addParagraph = useCallback(async (paragraphData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await paragraphsAPI.create(paragraphData);
      const newParagraph = response.data.paragraph || response.data;
      setParagraphs((prev) => [...prev, newParagraph]);
      return { success: true, data: newParagraph };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add paragraph';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a story
  const updateStory = useCallback(async (id, storyData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storiesAPI.update(id, storyData);
      const updatedStory = response.data.story || response.data;
      setStories((prev) =>
        prev.map((story) => (story._id === id ? updatedStory : story))
      );
      if (currentStory?._id === id) {
        setCurrentStory(updatedStory);
      }
      return { success: true, data: updatedStory };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update story';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [currentStory]);

  // Delete a story
  const deleteStory = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await storiesAPI.delete(id);
      setStories((prev) => prev.filter((story) => story._id !== id));
      if (currentStory?._id === id) {
        setCurrentStory(null);
      }
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete story';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [currentStory]);

  const value = {
    stories,
    currentStory,
    paragraphs,
    loading,
    error,
    fetchStories,
    fetchStory,
    fetchParagraphs,
    createStory,
    addParagraph,
    updateStory,
    deleteStory,
  };

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
};

export default StoryContext;
