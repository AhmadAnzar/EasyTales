# Mock Data Setup

This directory contains mock data for development and testing purposes.

## Overview

The mock data includes:
- **10 diverse stories** across various genres (Fantasy, Sci-Fi, Mystery, Romance, Horror, Adventure, Drama, Comedy, Thriller)
- **10 paragraphs per story** (100 total paragraphs)
- **Realistic vote counts** on each paragraph
- **10 mock users** as authors and contributors

## Stories Included

1. **The Last Dragon Keeper** (Fantasy) - A young orphan discovers she can communicate with the last living dragon
2. **Echoes from Mars** (Science Fiction) - Astronauts discover mysterious signals beneath Mars' surface
3. **The Vanishing Violinist** (Mystery) - A world-famous violinist disappears mid-performance
4. **Coffee Shop Chronicles** (Romance) - Two strangers' fateful encounters at a coffee shop
5. **The Whispering Walls** (Horror) - A family moves into a house where walls whisper dark secrets
6. **Treasure of the Forgotten Isle** (Adventure) - Quest for a legendary island that appears once per century
7. **The Final Performance** (Drama) - An aging actor's last chance to reconcile with his daughter
8. **My Robot Roommate** (Comedy) - Hilarious chaos when a college student wins an AI robot roommate
9. **The Memory Thief** (Thriller) - A therapist discovers memories are being stolen and sold
10. **When Time Stood Still** (Science Fiction) - A physicist accidentally freezes time for the entire world

## Usage

### Using the Mock Data Hook

```javascript
import { useMockData, mockAPI } from '../hooks/useMockData';

// In your component
function MyComponent() {
  const { data, loading } = useMockData();
  
  // Or use individual API calls
  const stories = await mockAPI.getStories();
  const story = await mockAPI.getStory('story1');
  const results = await mockAPI.searchStories('dragon');
}
```

### Available Mock API Functions

- `mockAPI.getStories()` - Get all stories
- `mockAPI.getStory(id)` - Get a single story with its paragraphs
- `mockAPI.createStory(storyData)` - Simulate creating a new story
- `mockAPI.getParagraphs(storyId)` - Get all paragraphs for a story
- `mockAPI.addParagraph(storyId, content)` - Simulate adding a paragraph
- `mockAPI.voteParagraph(paragraphId, voteType)` - Simulate voting
- `mockAPI.getCurrentUser()` - Get the mock current user
- `mockAPI.searchStories(query)` - Search stories by title, description, or genre
- `mockAPI.filterByGenre(genre)` - Filter stories by genre

## Integration with Pages

The following pages have been updated to use mock data:

- **Home.jsx** - Displays all 10 stories with search and filter functionality
- **Story.jsx** - Shows individual story with all paragraphs and voting

## Switching to Real API

When your backend is ready, simply replace the `mockAPI` imports with your real API service:

```javascript
// Before (mock data)
import { mockAPI } from '../hooks/useMockData';
const stories = await mockAPI.getStories();

// After (real API)
import { storiesAPI } from '../services/api';
const stories = await storiesAPI.getAll();
```

## Features

- **Realistic delays** - Mock API calls include simulated network delays (150-400ms)
- **Proper data structure** - Follows the same schema as your real backend
- **Vote simulation** - Paragraphs have realistic vote counts (15-40 upvotes, 1-5 downvotes)
- **Varied content** - First 3 stories have full, unique paragraph content; remaining stories use generated content
- **Timestamps** - Realistic creation dates spread across recent months

## Notes

- Mock data is loaded from `src/data/mockData.js`
- The hook provides automatic loading states
- All dates are in ISO format
- User IDs and story IDs use simple string identifiers for easy testing

Enjoy your populated app! 🎉
