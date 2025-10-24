import express from 'express';
import { castVote, getVoteCounts, getUserVote } from '../controllers/voteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, castVote);
router.get('/:paragraphId', getVoteCounts);
router.get('/user/:paragraphId', auth, getUserVote);

export default router;
