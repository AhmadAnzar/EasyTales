import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  seed_paragraph_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paragraph' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  language: { type: String, default: 'en' },
  metadata: {
    tags: [{ type: String }],
    genre: { type: String },
    description: { type: String }
  },
  winningParagraphId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paragraph' }
});

export default mongoose.model('Story', storySchema);
