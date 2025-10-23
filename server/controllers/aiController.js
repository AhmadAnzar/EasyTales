import axios from 'axios';
import Story from '../models/Story.js';
import Paragraph from '../models/Paragraph.js';

// @desc    Generate AI paragraph suggestion
// @route   POST /api/ai/generate
// @access  Private
export const generateParagraph = async (req, res) => {
  try {
    const { storyId, prompt } = req.body;

    if (!storyId) {
      return res.status(400).json({ message: 'Story ID is required' });
    }

    // Get story and existing paragraphs for context
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const paragraphs = await Paragraph.find({ storyId: storyId })
      .sort({ createdAt: 1 })
      .limit(5); // Get last 5 paragraphs for context

    const context = paragraphs.map(p => p.content).join('\n\n');

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return a mock suggestion if no API key
      return res.json({
        success: true,
        suggestion: `This is a continuation of "${story.title}". ${prompt || 'The story continues with unexpected twists and turns...'}`,
        message: 'Mock AI suggestion (OpenAI API key not configured)',
      });
    }

    // Call OpenAI API
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a creative storytelling assistant. Generate the next paragraph for a story titled "${story.title}" in the ${story.genre || 'general'} genre.`,
            },
            {
              role: 'user',
              content: `Here's the story so far:\n\n${context}\n\n${prompt || 'Continue the story naturally.'}`,
            },
          ],
          max_tokens: 200,
          temperature: 0.8,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const suggestion = response.data.choices[0].message.content.trim();

      res.json({
        success: true,
        suggestion,
      });
    } catch (apiError) {
      console.error('OpenAI API error:', apiError.response?.data || apiError.message);
      // Return a fallback suggestion
      res.json({
        success: true,
        suggestion: `Continuing "${story.title}"... ${prompt || 'The adventure unfolds with new challenges and discoveries.'}`,
        message: 'AI API unavailable, returning fallback suggestion',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Summarize a story
// @route   POST /api/ai/summarize
// @access  Public
export const summarizeStory = async (req, res) => {
  try {
    const { storyId } = req.body;

    if (!storyId) {
      return res.status(400).json({ message: 'Story ID is required' });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const paragraphs = await Paragraph.find({ storyId: storyId }).sort({ createdAt: 1 });
    const content = paragraphs.map(p => p.content).join('\n\n');

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return a simple summary if no API key
      return res.json({
        success: true,
        summary: `${story.title} - A ${story.genre || 'collaborative'} story with ${paragraphs.length} paragraphs. ${story.description || ''}`,
        message: 'Mock summary (OpenAI API key not configured)',
      });
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that summarizes stories concisely.',
            },
            {
              role: 'user',
              content: `Summarize this story in 2-3 sentences:\n\n${content}`,
            },
          ],
          max_tokens: 150,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const summary = response.data.choices[0].message.content.trim();

      res.json({
        success: true,
        summary,
      });
    } catch (apiError) {
      console.error('OpenAI API error:', apiError.response?.data || apiError.message);
      res.json({
        success: true,
        summary: `${story.title}: ${story.description || 'A collaborative story'} with ${paragraphs.length} paragraphs.`,
        message: 'AI API unavailable, returning basic summary',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Moderate paragraph content
// @route   POST /api/ai/moderate
// @access  Private
export const moderateContent = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return a permissive response if no API key
      return res.json({
        success: true,
        approved: true,
        message: 'Content moderation not configured',
      });
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/moderations',
        {
          input: content,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data.results[0];
      const approved = !result.flagged;

      res.json({
        success: true,
        approved,
        categories: result.categories,
        message: approved ? 'Content approved' : 'Content flagged for review',
      });
    } catch (apiError) {
      console.error('OpenAI API error:', apiError.response?.data || apiError.message);
      res.json({
        success: true,
        approved: true,
        message: 'Moderation API unavailable, content approved by default',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
