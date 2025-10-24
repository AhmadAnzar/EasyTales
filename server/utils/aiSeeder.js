import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Generate AI content using Gemini API
export const generateWithGemini = async (prompt) => {
  if (!GEMINI_API_KEY) {
    console.log('No Gemini API key found, using fallback content');
    return generateFallbackContent();
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    return generateFallbackContent();
  }
};

// Fallback content when API is not available
const generateFallbackContent = () => {
  const storyTitles = [
    "The Lighthouse at 3 AM",
    "The Last Bus Home", 
    "Midnight in the Garden",
    "The Forgotten Library",
    "Echoes in the Attic",
    "The Clockmaker's Secret",
    "Rain on a Tuesday",
    "The Door That Wasn't There",
    "Memories of Tomorrow",
    "The Cat Who Knew Too Much"
  ];

  const storyOpenings = [
    "The rain pounded against the windows as Sarah sat alone in the dimly lit room, wondering how she had gotten here.",
    "Detective Martinez knew this case would be different the moment he saw the peculiar symbol carved into the old oak door.",
    "In the quiet hours before dawn, the lighthouse beam swept across the stormy sea, but tonight something was different.",
    "The letter arrived on a Tuesday, but it was dated three years in the future.",
    "Every morning, the same bus driver, the same route, but today the destination was completely unfamiliar.",
    "The library had been closed for decades, yet the lights were still on in the third-floor window.",
    "She had walked this path a thousand times, but today the trees whispered secrets she had never heard before.",
    "The clock struck thirteen, and that's when everything changed.",
    "In the attic of the old Victorian house, Emma discovered a door that led to yesterday.",
    "The cat sat on the windowsill, watching the world with eyes that seemed to understand everything."
  ];

  const paragraphContinuations = [
    "As the story unfolded, new mysteries began to surface that no one had anticipated.",
    "The character's journey took an unexpected turn when they discovered the truth behind the facade.",
    "With each passing moment, the tension grew thicker, and the stakes became higher.",
    "The revelation that came next would change everything they thought they knew.",
    "In the distance, a figure emerged from the shadows, bringing with them answers to questions that had been asked for years.",
    "The pieces of the puzzle were finally starting to come together, but the picture was more complex than anyone had imagined.",
    "As dawn broke over the horizon, new possibilities began to emerge from the darkness.",
    "The truth, when it finally came, was both simpler and more profound than anyone had expected.",
    "With a deep breath, they stepped forward into the unknown, ready to face whatever lay ahead.",
    "The story was far from over, and the best chapters were yet to be written."
  ];

  return {
    title: storyTitles[Math.floor(Math.random() * storyTitles.length)],
    opening: storyOpenings[Math.floor(Math.random() * storyOpenings.length)],
    continuation: paragraphContinuations[Math.floor(Math.random() * paragraphContinuations.length)]
  };
};

// Generate multiple story seeds
export const generateStorySeeds = async (count = 20) => {
  const stories = [];
  
  for (let i = 0; i < count; i++) {
    const prompt = `Generate a creative story title and opening paragraph. The story should be engaging and suitable for collaborative writing. Include:
    - A compelling title (2-8 words)
    - An opening paragraph (2-4 sentences) that sets up mystery, intrigue, or adventure
    - Make it suitable for multiple writers to continue
    
    Format as JSON:
    {
      "title": "Story Title",
      "opening": "Opening paragraph text...",
      "genre": "mystery|fantasy|sci-fi|romance|horror|adventure|drama|comedy",
      "tags": ["tag1", "tag2", "tag3"]
    }`;

    try {
      const aiContent = await generateWithGemini(prompt);
      const storyData = JSON.parse(aiContent);
      stories.push({
        title: storyData.title || `Generated Story ${i + 1}`,
        opening: storyData.opening || generateFallbackContent().opening,
        genre: storyData.genre || 'mystery',
        tags: storyData.tags || ['collaborative', 'creative']
      });
    } catch (error) {
      console.error(`Error generating story ${i + 1}:`, error);
      const fallback = generateFallbackContent();
      stories.push({
        title: fallback.title,
        opening: fallback.opening,
        genre: 'mystery',
        tags: ['collaborative', 'creative']
      });
    }
  }

  return stories;
};

// Generate paragraph continuations for existing stories
export const generateParagraphContinuations = async (storyContext, count = 3) => {
  const prompt = `Based on this story context, generate ${count} different paragraph continuations. Each should be 2-4 sentences and offer a different direction for the story:

    Story: "${storyContext.title}"
    Current content: "${storyContext.content}"
    
    Generate ${count} different continuations that could follow naturally. Each should be creative and engaging.
    
    Format as JSON array:
    [
      "First continuation paragraph...",
      "Second continuation paragraph...", 
      "Third continuation paragraph..."
    ]`;

  try {
    const aiContent = await generateWithGemini(prompt);
    const continuations = JSON.parse(aiContent);
    return Array.isArray(continuations) ? continuations : [aiContent];
  } catch (error) {
    console.error('Error generating paragraph continuations:', error);
    return [
      "The story continued to unfold in unexpected ways, revealing new layers of complexity.",
      "As the narrative progressed, new characters emerged to play their part in the tale.",
      "The plot thickened with each passing moment, drawing readers deeper into the mystery."
    ];
  }
};

// Generate user names and profiles
export const generateUserProfiles = async (count = 15) => {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    const prompt = `Generate a creative username and brief profile for a collaborative writing platform user. Make it realistic and engaging.
    
    Format as JSON:
    {
      "username": "creative_username",
      "email": "username@example.com",
      "bio": "Brief description of the user's writing interests"
    }`;

    try {
      const aiContent = await generateWithGemini(prompt);
      const userData = JSON.parse(aiContent);
      users.push({
        username: userData.username || `writer${i + 1}`,
        email: userData.email || `writer${i + 1}@example.com`,
        bio: userData.bio || 'Passionate collaborative writer'
      });
    } catch (error) {
      console.error(`Error generating user ${i + 1}:`, error);
      users.push({
        username: `writer${i + 1}`,
        email: `writer${i + 1}@example.com`,
        bio: 'Passionate collaborative writer'
      });
    }
  }

  return users;
};





