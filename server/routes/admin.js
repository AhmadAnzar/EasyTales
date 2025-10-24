import express from 'express';
import {
  getAllUsers,
  getAllStoriesAdmin,
  deleteParagraphAdmin,
  deleteUser,
  deleteStoryAdmin,
} from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(auth);
router.use(adminAuth);

router.get('/users', getAllUsers);
router.get('/stories', getAllStoriesAdmin);
router.delete('/paragraphs/:id', deleteParagraphAdmin);
router.delete('/users/:id', deleteUser);
router.delete('/stories/:id', deleteStoryAdmin);

export default router;
