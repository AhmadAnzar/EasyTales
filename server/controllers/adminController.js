import User from '../models/User.js';
import Story from '../models/Story.js';
import Paragraph from '../models/Paragraph.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all stories (admin view)
// @route   GET /api/admin/stories
// @access  Private/Admin
export const getAllStoriesAdmin = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });
    // Normalize to include `author` for client
    const normalized = stories.map((s) => {
      const obj = s.toObject();
      obj.author = obj.createdBy;
      delete obj.createdBy;
      return obj;
    });
    res.json({ success: true, stories: normalized });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete paragraph (admin)
// @route   DELETE /api/admin/paragraphs/:id
// @access  Private/Admin
export const deleteParagraphAdmin = async (req, res) => {
  try {
    const paragraph = await Paragraph.findById(req.params.id);

    if (!paragraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }

    await Paragraph.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Paragraph deleted successfully by admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (admin)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  // Delete user's stories (createdBy) and paragraphs (authorId)
  await Story.deleteMany({ createdBy: req.params.id });
  await Paragraph.deleteMany({ authorId: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'User and associated content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete story (admin)
// @route   DELETE /api/admin/stories/:id
// @access  Private/Admin
export const deleteStoryAdmin = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

  // Delete all paragraphs associated with this story (use storyId)
  await Paragraph.deleteMany({ storyId: req.params.id });
    await Story.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Story deleted successfully by admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
