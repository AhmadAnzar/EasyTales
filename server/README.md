# EasyTales Backend Server

Backend API for EasyTales - A collaborative storytelling platform where users create stories together through voting and submissions.

## Features

- **User Authentication**: JWT-based authentication with signup/login
- **Story Management**: Create, read, update, delete stories
- **Collaborative Paragraphs**: Users submit paragraphs with voting system
- **Timer-Based Submissions**: Submission and voting phases
- **AI Integration**: OpenAI-powered paragraph suggestions and content moderation
- **Admin Panel**: Admin routes for content management

## Tech Stack

- **Node.js** + **Express** - Server framework
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI features (optional)

## Installation

1. **Install dependencies**:
```bash
cd server
npm install
```

2. **Setup environment variables**:
Create a `.env` file in the server directory:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/easytales
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key (optional)
CORS_ORIGIN=http://localhost:5173
```

3. **Start MongoDB** (if running locally):
```bash
mongod
```

4. **Run the server**:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user

### Users (`/api/users`)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user profile (auth required)
- `GET /:id/stories` - Get all stories by user

### Stories (`/api/stories`)
- `GET /` - Get all stories (supports filters: genre, status, search)
- `POST /` - Create new story (auth required)
- `GET /:id` - Get single story with paragraphs
- `PUT /:id` - Update story (auth required)
- `DELETE /:id` - Delete story (auth required)

### Paragraphs (`/api/paragraphs`)
- `POST /` - Add paragraph to story (auth required)
- `GET /:storyId` - Get paragraphs for a story
- `PUT /:id` - Update paragraph (auth required)
- `DELETE /:id` - Delete paragraph (auth required)

### Votes (`/api/votes`)
- `POST /` - Cast or update vote (auth required)
- `GET /:paragraphId` - Get vote counts
- `GET /user/:paragraphId` - Get user's vote (auth required)

### AI (`/api/ai`)
- `POST /generate` - Generate AI paragraph suggestion (auth required)
- `POST /summarize` - Summarize a story
- `POST /moderate` - Moderate content (auth required)

### Admin (`/api/admin`)
- `GET /users` - Get all users (admin only)
- `GET /stories` - Get all stories (admin only)
- `DELETE /paragraphs/:id` - Delete paragraph (admin only)
- `DELETE /users/:id` - Delete user (admin only)
- `DELETE /stories/:id` - Delete story (admin only)

## Data Models

### User
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date
}
```

### Story
```javascript
{
  title: String,
  description: String,
  genre: String,
  status: String ('active' | 'completed'),
  author: ObjectId (User),
  submissionPhaseEnd: Date,
  votingPhaseEnd: Date,
  createdAt: Date
}
```

### Paragraph
```javascript
{
  content: String,
  position: Number,
  author: ObjectId (User),
  story: ObjectId (Story),
  votes: {
    upvotes: Number,
    downvotes: Number
  },
  phase: String ('submission' | 'voting' | 'completed'),
  createdAt: Date
}
```

### Vote
```javascript
{
  user: ObjectId (User),
  paragraph: ObjectId (Paragraph),
  type: String ('upvote' | 'downvote'),
  createdAt: Date
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

The frontend should store the token (in localStorage or context) and include it in API requests.

## Frontend Integration

The backend is designed to work seamlessly with the React frontend. Update the frontend's `api.js` to point to:
```javascript
const API_URL = 'http://localhost:5000/api';
```

## AI Features

AI features are optional. If `OPENAI_API_KEY` is not configured:
- `/api/ai/generate` returns mock suggestions
- `/api/ai/summarize` returns basic summaries
- `/api/ai/moderate` approves all content

To enable AI features, get an OpenAI API key from https://platform.openai.com/

## Admin Setup

To make a user an admin, update the database directly:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── userController.js    # User operations
│   ├── storyController.js   # Story CRUD
│   ├── paragraphController.js # Paragraph operations
│   ├── voteController.js    # Voting logic
│   ├── aiController.js      # AI features
│   └── adminController.js   # Admin operations
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── adminAuth.js         # Admin authorization
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Story.js             # Story schema
│   ├── Paragraph.js         # Paragraph schema
│   └── Vote.js              # Vote schema
├── routes/
│   ├── auth.js              # Auth routes
│   ├── users.js             # User routes
│   ├── stories.js           # Story routes
│   ├── paragraphs.js        # Paragraph routes
│   ├── votes.js             # Vote routes
│   ├── ai.js                # AI routes
│   └── admin.js             # Admin routes
├── .env                     # Environment variables
├── .env.example             # Example env file
├── package.json             # Dependencies
└── server.js                # Main server file
```

## Contributing

This backend is built to support the EasyTales collaborative storytelling platform. Feel free to extend it with additional features!

## License

ISC
