import axios from 'axios';
import Story from '../models/Story.js';
import Paragraph from '../models/Paragraph.js';

// @desc    Generate AI paragraph suggestion
// @route   POST /api/ai/generate
// @access  Private
// Enhanced fallback suggestions based on genre and context
const generateFallbackSuggestion = (story, context) => {
  const suggestions = {
    'fantasy': [
      `In the realm of "${story.title}", magical energies began to stir...`,
      'Ancient whispers echoed through the enchanted forest, revealing secrets long forgotten.',
      'The mystical artifact pulsed with otherworldly power, drawing our heroes deeper into adventure.',
    ],
    'mystery': [
      `The investigation in "${story.title}" took an unexpected turn...`,
      'A cryptic clue emerged from the shadows, challenging everything they thought they knew.',
      'The detective\'s instincts tingled as another piece of the puzzle fell into place.',
    ],
    'romance': [
      `Hearts intertwined in "${story.title}" as destiny brought them together...`,
      'A tender moment passed between them, filled with unspoken promises and gentle hope.',
      'Love found a way to bloom even in the most unexpected circumstances.',
    ],
    'adventure': [
      `The quest in "${story.title}" led to uncharted territories...`,
      'With courage as their compass, they ventured forth into the unknown wilderness.',
      'The path ahead promised both peril and wonder in equal measure.',
    ],
    'default': [
      `The story of "${story.title}" continued to unfold with new possibilities...`,
      'Characters faced choices that would shape their destiny in ways they never imagined.',
      'The narrative took an intriguing turn, revealing hidden depths and unexpected connections.',
    ]
  };

  const genreSuggestions = suggestions[story.genre?.toLowerCase()] || suggestions.default;
  return genreSuggestions[Math.floor(Math.random() * genreSuggestions.length)];
};

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
      // Return an enhanced suggestion if no API key
      return res.json({
        success: true,
        suggestion: generateFallbackSuggestion(story, context),
        message: 'Creative AI suggestion generated locally',
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
      // Return a genre-appropriate fallback suggestion
      res.json({
        success: true,
        suggestion: generateFallbackSuggestion(story, context),
        message: 'AI API unavailable, returning creative fallback suggestion',
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
