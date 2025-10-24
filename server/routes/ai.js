import express from 'express';
import { generateParagraph, summarizeStory, moderateContent } from '../controllers/aiController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', auth, generateParagraph);
router.post('/summarize', summarizeStory);
router.post('/moderate', auth, moderateContent);

export default router;
