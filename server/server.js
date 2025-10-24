import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import storyRoutes from './routes/stories.js';
import paragraphRoutes from './routes/paragraphs.js';
import voteRoutes from './routes/votes.js';
import aiRoutes from './routes/ai.js';
import adminRoutes from './routes/admin.js';
import seedRoutes from './routes/seed.js';

// Middleware imports
import errorHandler from './middleware/errorHandler.js';

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      process.env.CORS_ORIGIN || 'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3001',
      'http://127.0.0.1:3001',
      'http://localhost:3000',  // add this
      'http://127.0.0.1:3000',  // add this too
      'https://easy-tales.vercel.app'
    ];
    // Allow non-browser tools (no origin) and allowed origins
    if (!origin || allowed.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/paragraphs', paragraphRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seed', seedRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'EasyTales API is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT;
if (!PORT) console.warn("process.env.PORT not set, using 5000 for local development");

connectDB().then(() => {
  app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT || 5000}`);
  });
});
