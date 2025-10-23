import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paragraphId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paragraph', required: true },
  vote: { type: Number, enum: [1, -1], required: true }, // 1 for upvote, -1 for downvote
  createdAt: { type: Date, default: Date.now },
});

voteSchema.index({ userId: 1, paragraphId: 1 }, { unique: true }); // One vote per user per paragraph

export default mongoose.model('Vote', voteSchema);
