import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import { generateStorySeeds, generateUserProfiles, generateParagraphContinuations } from '../utils/aiSeeder.js';

// Import models
import User from '../models/User.js';
import Story from '../models/Story.js';
import Paragraph from '../models/Paragraph.js';
import Vote from '../models/Vote.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    console.log('🔌 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Story.deleteMany({});
    await Paragraph.deleteMany({});
    await Vote.deleteMany({});
    
    // Generate AI content
    console.log('🤖 Generating AI content...');
    const [storySeeds, userProfiles] = await Promise.all([
      generateStorySeeds(25),
      generateUserProfiles(20)
    ]);
    
    // Create users
    console.log('👥 Creating users...');
    const users = [];
    for (const profile of userProfiles) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = await User.create({
        username: profile.username,
        email: profile.email,
        password: hashedPassword,
        isAdmin: false
      });
      users.push(user);
    }
    
    // Add a few admin users
    const adminUsers = await Promise.all([
      User.create({
        username: 'admin',
        email: 'admin@easytales.com',
        password: await bcrypt.hash('admin123', 10),
        isAdmin: true
      }),
      User.create({
        username: 'moderator',
        email: 'mod@easytales.com', 
        password: await bcrypt.hash('mod123', 10),
        isAdmin: true
      })
    ]);
    users.push(...adminUsers);
    
    console.log(`✅ Created ${users.length} users`);
    
    // Create stories with initial paragraphs
    console.log('📚 Creating stories...');
    const stories = [];
    const allParagraphs = [];
    
    for (let i = 0; i < storySeeds.length; i++) {
      const seed = storySeeds[i];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      
      // Create story
      const story = await Story.create({
        title: seed.title,
        createdBy: randomUser._id,
        status: Math.random() > 0.8 ? 'closed' : 'open', // 20% closed
        language: 'en',
        metadata: {
          tags: seed.tags,
          genre: seed.genre,
          description: `A collaborative ${seed.genre} story`
        }
      });
      stories.push(story);
      
      // Create seed paragraph
      const seedParagraph = await Paragraph.create({
        storyId: story._id,
        content: seed.opening,
        authorId: randomUser._id,
        parentParagraphId: null,
        votesCount: Math.floor(Math.random() * 15) + 1
      });
      allParagraphs.push(seedParagraph);
      
      // Update story with seed paragraph
      story.seed_paragraph_id = seedParagraph._id;
      await story.save();
      
      // Generate 2-5 additional paragraphs for each story
      const paragraphCount = Math.floor(Math.random() * 4) + 2;
      const storyContext = {
        title: story.title,
        content: seed.opening
      };
      
      try {
        const continuations = await generateParagraphContinuations(storyContext, paragraphCount);
        
        for (let j = 0; j < paragraphCount; j++) {
          const randomAuthor = users[Math.floor(Math.random() * users.length)];
          const paragraph = await Paragraph.create({
            storyId: story._id,
            content: continuations[j] || `The story continued to unfold in unexpected ways...`,
            authorId: randomAuthor._id,
            parentParagraphId: seedParagraph._id,
            votesCount: Math.floor(Math.random() * 20) + 1
          });
          allParagraphs.push(paragraph);
        }
      } catch (error) {
        console.error(`Error generating paragraphs for story ${i + 1}:`, error);
        // Create fallback paragraphs
        for (let j = 0; j < 3; j++) {
          const randomAuthor = users[Math.floor(Math.random() * users.length)];
          const paragraph = await Paragraph.create({
            storyId: story._id,
            content: `The narrative continued to develop, bringing new twists and turns to the story...`,
            authorId: randomAuthor._id,
            parentParagraphId: seedParagraph._id,
            votesCount: Math.floor(Math.random() * 15) + 1
          });
          allParagraphs.push(paragraph);
        }
      }
    }
    
    console.log(`✅ Created ${stories.length} stories with ${allParagraphs.length} paragraphs`);
    
    // Create votes for paragraphs
    console.log('🗳️ Creating votes...');
    const votes = [];
    
    for (const paragraph of allParagraphs) {
      const voteCount = Math.floor(Math.random() * 10) + 1;
      const voters = users.slice(0, Math.min(voteCount, users.length));
      
      for (const voter of voters) {
        try {
          const vote = await Vote.create({
            userId: voter._id,
            paragraphId: paragraph._id,
            vote: Math.random() > 0.2 ? 1 : -1 // 80% upvotes, 20% downvotes
          });
          votes.push(vote);
        } catch (error) {
          // Skip if user already voted on this paragraph
          continue;
        }
      }
    }
    
    console.log(`✅ Created ${votes.length} votes`);
    
    // Mark some stories as closed with winning paragraphs
    console.log('🏆 Setting winning paragraphs...');
    const openStories = stories.filter(s => s.status === 'open');
    const storiesToClose = openStories.slice(0, Math.floor(openStories.length * 0.3));
    
    for (const story of storiesToClose) {
      const storyParagraphs = allParagraphs.filter(p => p.storyId.toString() === story._id.toString());
      if (storyParagraphs.length > 0) {
        const winningParagraph = storyParagraphs.reduce((prev, current) => 
          (current.votesCount > prev.votesCount) ? current : prev
        );
        
        story.status = 'closed';
        story.winningParagraphId = winningParagraph._id;
        await story.save();
      }
    }
    
    // Update paragraph vote counts based on actual votes
    console.log('📊 Updating vote counts...');
    for (const paragraph of allParagraphs) {
      const paragraphVotes = await Vote.find({ paragraphId: paragraph._id });
      const voteSum = paragraphVotes.reduce((sum, vote) => sum + vote.vote, 0);
      paragraph.votesCount = voteSum;
      await paragraph.save();
    }
    
    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   👥 Users: ${users.length}`);
    console.log(`   📚 Stories: ${stories.length}`);
    console.log(`   📝 Paragraphs: ${allParagraphs.length}`);
    console.log(`   🗳️ Votes: ${votes.length}`);
    console.log(`   🏆 Closed stories: ${stories.filter(s => s.status === 'closed').length}`);
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
