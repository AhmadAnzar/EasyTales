import mongoose from 'mongoose';

const paragraphSchema = new mongoose.Schema({
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentParagraphId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paragraph', default: null },
  votesCount: { type: Number, default: 0 },
  voteWindowEndsAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Paragraph', paragraphSchema);
