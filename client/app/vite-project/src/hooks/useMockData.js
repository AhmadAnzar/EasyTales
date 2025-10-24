import { useState, useEffect } from 'react';
import { getAllMockData } from '../data/mockData';

/**
 * Custom hook to use mock data in development
 * This simulates API calls with realistic delays
 */
export function useMockData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setData(getAllMockData());
      setLoading(false);
    }, 500);
  }, []);

  return { data, loading };
}

/**
 * Mock API functions that simulate backend calls
 * Use these in your components instead of real API calls during development
 */
export const mockAPI = {
  // Stories
  getStories: async () => {
    await delay(300);
    const { stories } = getAllMockData();
    return stories;
  },

  getStory: async (id) => {
    await delay(200);
    const { stories, paragraphs } = getAllMockData();
    const story = stories.find(s => s._id === id);
    if (!story) throw new Error('Story not found');
    return {
      ...story,
      paragraphs: paragraphs[id] || [],
    };
  },

  createStory: async (storyData) => {
    await delay(400);
    return {
      _id: `story${Date.now()}`,
      ...storyData,
      createdAt: new Date().toISOString(),
      paragraphCount: 0,
      contributorCount: 0,
    };
  },

  // Paragraphs
  getParagraphs: async (storyId) => {
    await delay(200);
    const { paragraphs } = getAllMockData();
    return paragraphs[storyId] || [];
  },

  addParagraph: async (storyId, content) => {
    await delay(300);
    const { paragraphs, users } = getAllMockData();
    const storyParagraphs = paragraphs[storyId] || [];
    return {
      _id: `p${storyId}-${Date.now()}`,
      storyId,
      content,
      author: users[0], // Simulating current user
      position: storyParagraphs.length + 1,
      createdAt: new Date().toISOString(),
      votes: { upvotes: 0, downvotes: 0 },
    };
  },

  // Votes
  voteParagraph: async (paragraphId, voteType) => {
    await delay(150);
    return {
      success: true,
      voteType,
      paragraphId,
    };
  },

  // Users
  getCurrentUser: async () => {
    await delay(100);
    const { users } = getAllMockData();
    return users[0]; // Return first user as logged-in user
  },

  // Search
  searchStories: async (query) => {
    await delay(300);
    const { stories } = getAllMockData();
    if (!query) return stories;
    
    const lowerQuery = query.toLowerCase();
    return stories.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.genre.toLowerCase().includes(lowerQuery)
    );
  },

  // Filter by genre
  filterByGenre: async (genre) => {
    await delay(200);
    const { stories } = getAllMockData();
    if (!genre || genre === 'All') return stories;
    return stories.filter(s => s.genre === genre);
  },
};

// Helper function to simulate network delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
