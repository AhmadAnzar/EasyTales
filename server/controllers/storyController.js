import Story from '../models/Story.js';
import Paragraph from '../models/Paragraph.js';

// @desc    Get all stories with filters
// @route   GET /api/stories
// @access  Public
export const getAllStories = async (req, res) => {
  try {
    const { genre, status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (genre) filter['metadata.genre'] = genre;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'metadata.description': { $regex: search, $options: 'i' } },
        { 'metadata.tags': { $regex: search, $options: 'i' } }
      ];
    }

    const stories = await Story.find(filter)
      .populate('createdBy', 'username')
      .populate('seed_paragraph_id', 'content')
      .sort({ createdAt: -1 });

    // Get paragraph counts for each story
    const storiesWithCounts = await Promise.all(
      stories.map(async (story) => {
        const paragraphCount = await Paragraph.countDocuments({ storyId: story._id });
        const obj = story.toObject();
        // Provide author alias expected by client
        obj.author = obj.createdBy;
        delete obj.createdBy;
        return {
          ...obj,
          paragraphCount,
        };
      })
    );

    res.json({ success: true, stories: storiesWithCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new story
// @route   POST /api/stories
// @access  Private
export const createStory = async (req, res) => {
  try {
    const { title, description, genre, tags, firstParagraph } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const story = await Story.create({
      title,
      createdBy: req.userId,
      metadata: {
        description: description || '',
        genre: genre || 'general',
        tags: tags || ['collaborative']
      }
    });

    // Create seed paragraph if provided
    let seedParagraph = null;
    if (firstParagraph) {
      seedParagraph = await Paragraph.create({
        storyId: story._id,
        content: firstParagraph,
        authorId: req.userId,
        parentParagraphId: null
      });
      
      story.seed_paragraph_id = seedParagraph._id;
      await story.save();
    }

    const populatedStory = await Story.findById(story._id)
      .populate('createdBy', 'username')
      .populate('seed_paragraph_id', 'content');

    const storyObj = populatedStory.toObject();
    storyObj.author = storyObj.createdBy;
    delete storyObj.createdBy;

    res.status(201).json({ success: true, story: storyObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single story by ID
// @route   GET /api/stories/:id
// @access  Public
export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('seed_paragraph_id', 'content')
      .populate('winningParagraphId', 'content');

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Get paragraphs for this story, sorted by creation time
    const paragraphs = await Paragraph.find({ storyId: req.params.id })
      .populate('authorId', 'username')
      .sort({ createdAt: 1 });

    const storyObj = story.toObject();
    storyObj.author = storyObj.createdBy;
    delete storyObj.createdBy;

    res.json({ success: true, story: { ...storyObj, paragraphs } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update story
// @route   PUT /api/stories/:id
// @access  Private
export const updateStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Check if user is the author (use createdBy)
    if (story.createdBy.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this story' });
    }

    const { title, description, genre, status } = req.body;
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (genre) updateData.genre = genre;
    if (status) updateData.status = status;

    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');

    const storyObj = updatedStory.toObject();
    storyObj.author = storyObj.createdBy;
    delete storyObj.createdBy;

    res.json({ success: true, story: storyObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private
export const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Check if user is the author (use createdBy)
    if (story.createdBy.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this story' });
    }

    // Delete all paragraphs associated with this story (use storyId field)
    await Paragraph.deleteMany({ storyId: req.params.id });

    await Story.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
