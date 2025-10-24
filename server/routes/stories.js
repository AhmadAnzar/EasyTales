import express from 'express';
import {
  getAllStories,
  createStory,
  getStoryById,
  updateStory,
  deleteStory,
} from '../controllers/storyController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllStories);
router.post('/', auth, createStory);
router.get('/:id', getStoryById);
router.put('/:id', auth, updateStory);
router.delete('/:id', auth, deleteStory);

export default router;
