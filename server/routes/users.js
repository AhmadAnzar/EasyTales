import express from 'express';
import { getUserById, updateUser, getUserStories } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', auth, updateUser);
router.get('/:id/stories', getUserStories);

export default router;
