import express from 'express';
import {
  createParagraph,
  getParagraphsByStory,
  updateParagraph,
  deleteParagraph,
} from '../controllers/paragraphController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createParagraph);
router.get('/:storyId', getParagraphsByStory);
router.put('/:id', auth, updateParagraph);
router.delete('/:id', auth, deleteParagraph);

export default router;
