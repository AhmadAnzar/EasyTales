import express from 'express';
import seedDatabase from '../scripts/seedDatabase.js';

const router = express.Router();

// @desc    Seed database with AI-generated content
// @route   POST /api/seed
// @access  Development only
router.post('/', async (req, res) => {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ 
        success: false, 
        message: 'Seeding not allowed in production' 
      });
    }

    console.log('🌱 Starting database seeding via API...');
    
    // Run seeding in background
    seedDatabase().catch(error => {
      console.error('Seeding error:', error);
    });

    res.json({ 
      success: true, 
      message: 'Database seeding started. Check server logs for progress.' 
    });
  } catch (error) {
    console.error('Seeding endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to start seeding process' 
    });
  }
});

export default router;
