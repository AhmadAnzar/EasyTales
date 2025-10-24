# 📚 EasyTales - Collaborative Storytelling Platform

> **Where Stories Come to Life Through Community Collaboration**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb)](https://mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

EasyTales is a modern web platform that brings writers together to create compelling stories through collaborative storytelling. Users can start stories, contribute paragraphs, vote on submissions, and watch narratives evolve organically through community participation.

## ✨ Key Features

### 🖋️ **Collaborative Writing**
- **Story Creation**: Users initiate stories with engaging opening paragraphs
- **Community Contributions**: Multiple writers add paragraphs to continue narratives
- **Democratic Voting**: Community votes determine which paragraphs become part of the official story
- **Real-time Collaboration**: See stories evolve as writers contribute and vote

### 🤖 **AI-Powered Assistance**
- **Smart Suggestions**: AI-powered paragraph recommendations to inspire writers
- **Creative Fallbacks**: Intelligent suggestions even when external APIs are unavailable
- **Content Moderation**: Automated content screening (when configured)
- **Genre-Aware Prompts**: Context-sensitive writing suggestions based on story genre

### 🎨 **Beautiful User Experience**
- **Interactive Landing Page**: Scroll-triggered story bubbles with animated paths
- **Brown Storytelling Theme**: Warm, book-inspired color palette throughout
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Custom Logo Integration**: Branded experience with custom assets

### 👤 **User Management**
- **Secure Authentication**: JWT-based login/signup with encrypted passwords
- **Personal Profiles**: User dashboards with writing statistics and preferences
- **Story Collections**: Track authored stories, contributions, and favorites
- **Community Recognition**: Display user initials and contribution counts

### 🔄 **Dynamic Story Flows**
- **Multiple Display Modes**: Single story focus, 10-story grids, horizontal carousels
- **Advanced Filtering**: Search by title, genre, status, or author
- **Story Statistics**: View paragraph counts, contributor numbers, and engagement
- **Completion Tracking**: Stories can be marked as completed with winning paragraphs

### 📊 **Comprehensive Admin System**
- **Content Management**: Admin tools for story and user management
- **Database Seeding**: Automated generation of sample content for development
- **User Roles**: Admin and regular user permissions system
- **Analytics Dashboard**: Track platform usage and engagement metrics

## 🏗️ Architecture & Technology

### **Frontend (Client)**
```
Tech Stack: React 19.1.1 + Vite 7.1.7 + React Router 6.23.1
Port: 3000 (configured in vite.config.js)
State Management: React Context API (AuthContext, StoryContext)
Styling: CSS3 with CSS Variables, Google Fonts (Playfair Display, Merriweather)
```

### **Backend (Server)**
```
Tech Stack: Node.js + Express 5.1.0 + MongoDB/Mongoose 8.19.1
Port: 5000 (configurable via environment)
Authentication: JWT (jsonwebtoken 9.0.2) + bcryptjs 2.4.3
External APIs: OpenAI GPT-3.5-turbo (optional), Gemini API support
```

## 📁 Project Structure

```
EasyTales/
├── client/                          # React Frontend Application
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   │   ├── NavBar.jsx          # Navigation with user profiles & logo
│   │   │   ├── Footer.jsx          # App footer with social links
│   │   │   ├── StoryCard.jsx       # Story preview cards with logo integration
│   │   │   ├── ParagraphCard.jsx   # Paragraph display with voting UI
│   │   │   ├── ParagraphEditor.jsx # Rich text editor for writing
│   │   │   ├── AISuggestButton.jsx # AI-powered writing assistance
│   │   │   ├── VoteButton.jsx      # Upvote/downvote functionality
│   │   │   ├── SearchBar.jsx       # Story search and filtering
│   │   │   ├── StoryForm.jsx       # Story creation/editing forms
│   │   │   ├── ErrorBoundary.jsx   # Error handling wrapper
│   │   │   └── VotingTimer.jsx     # Voting phase countdown
│   │   │
│   │   ├── pages/                  # Route-level Page Components
│   │   │   ├── Landing.jsx         # Animated storytelling landing page
│   │   │   ├── Home.jsx            # Story catalog with multiple layouts
│   │   │   ├── Story.jsx           # Individual story reading view
│   │   │   ├── Write.jsx           # Story creation interface
│   │   │   ├── MyStories.jsx       # User's story management dashboard
│   │   │   ├── Profile.jsx         # User profile & statistics
│   │   │   ├── About.jsx           # Platform information
│   │   │   ├── SignIn.jsx          # User authentication
│   │   │   └── SignUp.jsx          # User registration
│   │   │
│   │   ├── context/                # React Context Providers
│   │   │   ├── AuthContext.jsx     # Authentication state & JWT handling
│   │   │   ├── StoryContext.jsx    # Story management & API calls
│   │   │   └── TimerContext.jsx    # Voting timer management
│   │   │
│   │   ├── services/               # API Integration Layer
│   │   │   └── api.js              # Axios instance with interceptors
│   │   │
│   │   ├── hooks/                  # Custom React Hooks
│   │   │   ├── useFetch.js         # Data fetching hook
│   │   │   └── useMockData.js      # Development data hook
│   │   │
│   │   ├── data/                   # Mock Data & Development Seeds
│   │   │   └── mockData.js         # Comprehensive story/user sample data
│   │   │
│   │   ├── utils/                  # Utility Functions
│   │   │   └── formatDate.js       # Date/time formatting helpers
│   │   │
│   │   └── assets/                 # Static Assets
│   │       ├── logo.jpg            # Platform logo
│   │       └── react.svg           # React default asset
│   │
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite build configuration
│   └── eslint.config.js            # Code linting rules
│
├── server/                         # Node.js Backend API
│   ├── controllers/                # Business Logic Controllers
│   │   ├── authController.js       # User authentication logic
│   │   ├── storyController.js      # Story CRUD operations
│   │   ├── paragraphController.js  # Paragraph management
│   │   ├── userController.js       # User profile operations
│   │   ├── voteController.js       # Voting system logic
│   │   ├── aiController.js         # AI integration with fallbacks
│   │   └── adminController.js      # Administrative functions
│   │
│   ├── models/                     # MongoDB Data Models
│   │   ├── User.js                 # User schema with authentication
│   │   ├── Story.js                # Story schema with metadata
│   │   ├── Paragraph.js            # Paragraph schema with voting
│   │   └── Vote.js                 # Vote tracking schema
│   │
│   ├── routes/                     # Express Route Definitions
│   │   ├── auth.js                 # Authentication endpoints
│   │   ├── stories.js              # Story management routes
│   │   ├── paragraphs.js           # Paragraph handling routes
│   │   ├── users.js                # User management routes
│   │   ├── votes.js                # Voting system routes
│   │   ├── ai.js                   # AI-powered features
│   │   ├── admin.js                # Administrative routes
│   │   └── seed.js                 # Database seeding endpoints
│   │
│   ├── middleware/                 # Express Middleware
│   │   ├── auth.js                 # JWT authentication middleware
│   │   ├── adminAuth.js            # Admin authorization middleware
│   │   └── errorHandler.js         # Global error handling
│   │
│   ├── config/                     # Configuration Files
│   │   └── database.js             # MongoDB connection setup
│   │
│   ├── scripts/                    # Utility Scripts
│   │   └── seedDatabase.js         # Database population script
│   │
│   ├── utils/                      # Server Utilities
│   │   └── aiSeeder.js             # AI-powered content generation
│   │
│   ├── server.js                   # Main Express application
│   └── package.json                # Backend dependencies
│
└── README.md                       # This comprehensive guide
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 18.0+ 
- **MongoDB** 4.4+ (local installation or cloud service)
- **Git** for version control
- **Code Editor** (VS Code recommended)

### 1. Clone & Setup
```bash
# Clone the repository
git clone https://github.com/AhmadAnzar/EasyTales.git
cd EasyTales

# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

### 2. Environment Configuration

**Server Configuration** (`server/.env`):
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Connection
MONGO_URI=mongodb://localhost:27017/easytales

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Optional AI Features
OPENAI_API_KEY=sk-your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

**Client Configuration** (`client/.env`):
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup
```bash
# Start MongoDB (if running locally)
mongod

# Seed the database with sample data (optional)
cd server
npm run seed
```

### 4. Launch the Application
```bash
# Terminal 1: Start the backend server
cd server
npm run dev     # Development mode with nodemon
# Server runs on http://localhost:5000

# Terminal 2: Start the frontend client
cd client  
npm run dev     # Development mode with Vite HMR
# Client runs on http://localhost:3000
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Development Features

### Hot Reload & Live Updates
- **Frontend**: Vite HMR for instant React updates
- **Backend**: Nodemon for automatic server restarts
- **Database**: Live MongoDB connection with change streams

### Mock Data System
The platform includes comprehensive mock data for development:
- **10 diverse stories** across multiple genres (Fantasy, Sci-Fi, Mystery, Romance, Horror, Adventure, Drama, Comedy, Thriller)
- **20 unique user profiles** with realistic usernames and bios
- **100+ story paragraphs** with full collaborative writing examples
- **Voting data** with realistic engagement patterns

### AI Integration Capabilities
- **OpenAI GPT-3.5-turbo** integration for high-quality suggestions
- **Intelligent fallback system** when APIs are unavailable  
- **Genre-aware prompting** for contextually relevant suggestions
- **Content moderation** capabilities (when API keys configured)

### Database Seeding
```bash
# Generate fresh sample data
npm run seed

# The seeder creates:
# - 20 users (including admin accounts)
# - 25 stories across all genres  
# - 50+ collaborative paragraphs
# - Realistic voting patterns
# - Admin/moderator accounts
```

## 📊 API Documentation

### Authentication Endpoints
```
POST   /api/auth/signup     # User registration
POST   /api/auth/login      # User authentication  
POST   /api/auth/logout     # Session termination
GET    /api/auth/me         # Current user profile
```

### Story Management
```
GET    /api/stories                    # List all stories (with filters)
POST   /api/stories                    # Create new story (auth required)
GET    /api/stories/:id                # Get single story with paragraphs
PUT    /api/stories/:id                # Update story (auth required)
DELETE /api/stories/:id                # Delete story (auth required)
```

### Collaborative Writing
```
POST   /api/paragraphs                 # Add paragraph to story (auth required)
GET    /api/paragraphs/:storyId        # Get story paragraphs
PUT    /api/paragraphs/:id             # Update paragraph (auth required)  
DELETE /api/paragraphs/:id             # Delete paragraph (auth required)
```

### Voting System
```
POST   /api/votes                      # Cast or update vote (auth required)
GET    /api/votes/:paragraphId         # Get vote counts for paragraph
GET    /api/votes/user/:paragraphId    # Get user's vote status (auth required)
```

### AI-Powered Features
```
POST   /api/ai/generate               # Generate paragraph suggestion (auth required)
POST   /api/ai/summarize              # Create story summary
POST   /api/ai/moderate               # Content moderation check (auth required)
```

### User Management
```
GET    /api/users/:id                 # Get user profile
PUT    /api/users/:id                 # Update user profile (auth required)
GET    /api/users/:id/stories         # Get user's stories
```

### Administrative Functions
```
GET    /api/admin/users               # List all users (admin only)
GET    /api/admin/stories             # List all stories (admin only)
DELETE /api/admin/users/:id           # Delete user (admin only)
DELETE /api/admin/stories/:id         # Delete story (admin only)
DELETE /api/admin/paragraphs/:id      # Delete paragraph (admin only)
```

## 🎨 Design System & Theming

### Color Palette
The platform uses a warm, brown storytelling theme:

```css
:root {
  /* Primary Brown Tones */
  --primary-color: #654321;        /* Rich brown for headers */
  --secondary-color: #8b7355;      /* Medium brown for accents */
  --accent-color: #a0522d;         /* Warm brown for highlights */
  
  /* Background Variations */
  --background-light: #f5f3f0;     /* Cream paper background */
  --background-paper: #faf8f5;     /* Lighter paper tone */
  --background-dark: #2c2416;      /* Dark brown for contrast */
  
  /* Text Colors */
  --text-dark: #2c2416;            /* Primary text */
  --text-medium: #4a3f2a;          /* Secondary text */
  --text-light: #6b5b3d;           /* Muted text */
  
  /* Interactive Elements */
  --button-primary: linear-gradient(135deg, #654321, #8b7355);
  --button-hover: linear-gradient(135deg, #8b7355, #a0522d);
  --shadow-brown: rgba(101, 67, 33, 0.2);
}
```

### Typography
- **Headings**: Playfair Display (elegant serif for storytelling feel)
- **Body Text**: Merriweather (readable serif for long-form content)
- **UI Elements**: System font stack for interface clarity

### Component Design Patterns
- **Story Cards**: Book-inspired layouts with subtle shadows
- **Navigation**: Clean, minimal design with user initial circles
- **Buttons**: Gradient browns with hover animations
- **Forms**: Paper-like backgrounds with brown accents
- **Voting**: Intuitive upvote/downvote with visual feedback

## 🔒 Security & Authentication

### JWT Authentication Flow
1. **Registration/Login**: User provides credentials
2. **Token Generation**: Server creates signed JWT with user data
3. **Token Storage**: Client stores token in localStorage
4. **Request Authentication**: Token sent in Authorization header
5. **Token Validation**: Server verifies JWT on protected routes
6. **Auto-Logout**: Invalid/expired tokens trigger automatic logout

### Security Features  
- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT Expiration**: Configurable token lifetime
- **CORS Protection**: Configurable allowed origins
- **Input Validation**: express-validator on all inputs
- **Admin Authorization**: Role-based access control
- **Error Sanitization**: No sensitive data in error responses

### Environment Security
- All sensitive credentials in `.env` files (gitignored)
- Separate configurations for development/production
- Optional API key configuration for enhanced features
- Secure MongoDB connection strings

## 🧪 Testing & Development

### Available Scripts

**Frontend (Client)**:
```bash
npm run dev          # Start development server (Vite + HMR)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint code analysis
```

**Backend (Server)**:
```bash
npm start            # Production server start
npm run dev          # Development with nodemon auto-restart
npm run seed         # Populate database with sample data
npm test             # Run test suite (placeholder)
```

### Development Workflow
1. **Backend First**: Start server and verify API endpoints
2. **Database Ready**: Ensure MongoDB connection and seed data
3. **Frontend Launch**: Start client with API integration
4. **Feature Development**: Use hot reload for rapid iteration
5. **Testing**: Manual testing with sample data

### Debugging & Troubleshooting

**Common Port Conflicts**:
```bash
# Check what's using port 3000/5000
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F
```

**MongoDB Connection Issues**:
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env` file  
- Ensure database permissions are correct
- Try connecting via MongoDB Compass

**API Integration Problems**:
- Verify `VITE_API_URL` points to correct backend
- Check CORS configuration in server
- Inspect network requests in browser DevTools
- Validate JWT token storage and transmission

## 🚀 Deployment Options

### Development Deployment
- **Frontend**: Vite dev server on port 3000
- **Backend**: Express server on port 5000  
- **Database**: Local MongoDB instance

### Production Considerations
- **Frontend**: Build with `npm run build`, serve static files
- **Backend**: Use PM2 or similar process manager
- **Database**: MongoDB Atlas or managed database service
- **Environment**: Secure environment variable management
- **SSL**: HTTPS configuration for production domains
- **Monitoring**: Error tracking and performance monitoring

### Recommended Hosting Platforms
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Railway, Render, or DigitalOcean
- **Database**: MongoDB Atlas (cloud) or self-hosted
- **Full Stack**: Heroku or AWS/Google Cloud Platform

## 🤝 Contributing

### Development Setup
1. Fork the repository on GitHub
2. Clone your fork locally  
3. Create feature branch: `git checkout -b feature/amazing-feature`
4. Follow existing code style and conventions
5. Test thoroughly with provided sample data
6. Submit pull request with detailed description

### Code Style Guidelines
- **Frontend**: ESLint configuration with React best practices
- **Backend**: Consistent Express.js patterns and error handling
- **Database**: Mongoose schema validation and proper indexing
- **Comments**: Document complex business logic and API endpoints
- **Commits**: Use conventional commit messages

### Feature Request Process
1. Check existing GitHub issues for similar requests
2. Create detailed issue with use case and requirements  
3. Discuss implementation approach with maintainers
4. Create pull request with tests and documentation
5. Participate in code review process

## 📝 License & Legal

**License**: MIT License - Feel free to use, modify, and distribute

**Third-Party Licenses**:
- React (MIT License)  
- Express.js (MIT License)
- MongoDB/Mongoose (Server Side Public License)
- All npm dependencies retain their respective licenses

**AI Integration**: Optional OpenAI integration requires separate API agreement

## 📞 Support & Community  

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides in `/docs` (when available)
- **Code Examples**: Sample implementations in mock data
- **Community**: Join discussions in GitHub Discussions

### Maintainers
- **Primary Maintainer**: Ahmad Anzar (@AhmadAnzar)
- **Project Repository**: https://github.com/AhmadAnzar/EasyTales
- **Current Status**: Active development and community contributions welcome

---

## 🎯 Roadmap & Future Enhancements

### Short Term (Current Development)
- ✅ Core collaborative writing functionality
- ✅ AI-powered writing assistance with fallbacks
- ✅ Responsive design with brown storytelling theme  
- ✅ User authentication and profile management
- ✅ Comprehensive mock data system

### Medium Term (Next Release)
- 🔄 Real-time collaboration with WebSockets
- 🔄 Enhanced voting mechanisms and story completion
- 🔄 Advanced search and filtering capabilities
- 🔄 Email notifications for story updates
- 🔄 Mobile app development (React Native)

### Long Term (Future Vision)
- 📋 Story export to PDF/EPUB formats
- 📋 Advanced analytics and writing insights  
- 📋 Story collaboration analytics and metrics
- 📋 Integration with publishing platforms
- 📋 Multi-language support and internationalization
- 📋 Advanced AI features (story analysis, style suggestions)

---

**EasyTales** - Empowering collaborative storytelling through modern web technology. Join our community of writers and help build the future of interactive fiction! 🚀📚✨
