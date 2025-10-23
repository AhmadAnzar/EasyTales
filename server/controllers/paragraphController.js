import Paragraph from '../models/Paragraph.js';
import Story from '../models/Story.js';

// @desc    Add paragraph to story
// @route   POST /api/paragraphs
// @access  Private
export const createParagraph = async (req, res) => {
  try {
    // Auth guard
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });

    const { content, storyId, parentParagraphId } = req.body;

    if (!content || !storyId) {
      return res.status(400).json({ message: 'Content and storyId are required' });
    }

    // Verify story exists and is open
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    
    if (story.status === 'closed') {
      return res.status(400).json({ message: 'Story is closed for new paragraphs' });
    }

    const paragraph = await Paragraph.create({
      content,
      storyId,
      authorId: req.userId,
      parentParagraphId: parentParagraphId || null,
      voteWindowEndsAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours voting window
    });

    const populatedParagraph = await Paragraph.findById(paragraph._id)
      .populate('authorId', 'username');

    // Normalize response to include `author` for client convenience
    const paragraphObj = populatedParagraph.toObject();
    paragraphObj.author = paragraphObj.authorId;
    delete paragraphObj.authorId;

    res.status(201).json({ success: true, paragraph: paragraphObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get paragraphs for a story
// @route   GET /api/paragraphs/:storyId
// @access  Public
export const getParagraphsByStory = async (req, res) => {
  try {
    // Verify story exists
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const paragraphs = await Paragraph.find({ storyId: req.params.storyId })
      .populate('authorId', 'username')
      .sort({ createdAt: 1 });

    // Normalize each paragraph to include `author` instead of `authorId`
    const normalized = paragraphs.map((p) => {
      const obj = p.toObject();
      obj.author = obj.authorId;
      delete obj.authorId;
      return obj;
    });

    res.json({ success: true, paragraphs: normalized });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update paragraph
// @route   PUT /api/paragraphs/:id
// @access  Private
export const updateParagraph = async (req, res) => {
  try {
    // Auth guard
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });

    const paragraph = await Paragraph.findById(req.params.id);

    if (!paragraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }

    // Check if user is the author (schema uses authorId)
    if (paragraph.authorId?.toString() !== req.userId?.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this paragraph' });
    }

    const { content } = req.body;
    if (content) paragraph.content = content;

    await paragraph.save();

    const populatedParagraph = await Paragraph.findById(paragraph._id)
      .populate('authorId', 'username');

    const paragraphObj = populatedParagraph.toObject();
    paragraphObj.author = paragraphObj.authorId;
    delete paragraphObj.authorId;

    res.json({ success: true, paragraph: paragraphObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete paragraph
// @route   DELETE /api/paragraphs/:id
// @access  Private
export const deleteParagraph = async (req, res) => {
  try {
    // Auth guard
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });

    const paragraph = await Paragraph.findById(req.params.id);

    if (!paragraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }

    // Check if user is the author (schema uses authorId)
    if (paragraph.authorId?.toString() !== req.userId?.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this paragraph' });
    }

    await Paragraph.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Paragraph deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
