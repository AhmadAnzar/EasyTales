import Vote from '../models/Vote.js';
import Paragraph from '../models/Paragraph.js';

// @desc    Cast or update vote on paragraph
// @route   POST /api/votes
// @access  Private
export const castVote = async (req, res) => {
  try {
    const { paragraphId, vote } = req.body;

    if (!paragraphId || vote === undefined) {
      return res.status(400).json({ message: 'Paragraph ID and vote are required' });
    }

    if (![1, -1].includes(vote)) {
      return res.status(400).json({ message: 'Vote must be 1 (upvote) or -1 (downvote)' });
    }

    // Verify paragraph exists
    const paragraph = await Paragraph.findById(paragraphId);
    if (!paragraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }

    // Check if user already voted
    let existingVote = await Vote.findOne({ userId: req.userId, paragraphId: paragraphId });

    if (existingVote) {
      // User already voted, update the vote if different
      if (existingVote.vote !== vote) {
        // Remove old vote from count
        paragraph.votesCount -= existingVote.vote;
        
        // Add new vote to count
        paragraph.votesCount += vote;
        
        existingVote.vote = vote;
        await existingVote.save();
        await paragraph.save();
      }
    } else {
      // New vote
      existingVote = await Vote.create({
        userId: req.userId,
        paragraphId: paragraphId,
        vote: vote,
      });

      // Update paragraph vote count
      paragraph.votesCount += vote;
      await paragraph.save();
    }

    res.json({
      success: true,
      vote: existingVote,
      votesCount: paragraph.votesCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vote counts for a paragraph
// @route   GET /api/votes/:paragraphId
// @access  Public
export const getVoteCounts = async (req, res) => {
  try {
    const paragraph = await Paragraph.findById(req.params.paragraphId);

    if (!paragraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }

    res.json({
      success: true,
      votesCount: paragraph.votesCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's vote on a paragraph
// @route   GET /api/votes/user/:paragraphId
// @access  Private
export const getUserVote = async (req, res) => {
  try {
    const vote = await Vote.findOne({
      userId: req.userId,
      paragraphId: req.params.paragraphId,
    });

    res.json({
      success: true,
      vote: vote ? vote.vote : null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
