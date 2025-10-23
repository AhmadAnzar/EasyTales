import User from '../models/User.js';
import Story from '../models/Story.js';

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.params.id !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const { username, email } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all stories by user
// @route   GET /api/users/:id/stories
// @access  Public
export const getUserStories = async (req, res) => {
  try {
    const stories = await Story.find({ createdBy: req.params.id })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

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
