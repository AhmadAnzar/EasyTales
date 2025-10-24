import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TimerContext = createContext();

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within TimerProvider');
  }
  return context;
};

// Timer phases
export const PHASES = {
  SUBMISSION: 'submission', // 2 minutes - fake submissions appear
  VOTING: 'voting',         // 1 minute - fake voting happens
  COMPLETED: 'completed',   // Voting ended, winner selected
};

// Timer durations in milliseconds (shortened for demo)
const SUBMISSION_DURATION = 2 * 60 * 1000; // 2 minutes
const VOTING_DURATION = 1 * 60 * 1000;     // 1 minute

// Fake paragraph data for demonstration
const FAKE_PARAGRAPHS = [
  {
    content: "The ancient door creaked open, revealing a spiral staircase that descended into darkness. Sarah hesitated for a moment, her flashlight trembling in her hand, before taking the first step down into the unknown depths below.",
    author: { username: "StoryWeaver92", _id: "fake1" }
  },
  {
    content: "With her heart pounding, Sarah called out to her companions above, but only silence answered her. The musty air grew colder with each step, and strange symbols began to appear on the stone walls, glowing faintly in an otherworldly light.",
    author: { username: "MysteryWriter", _id: "fake2" }
  },
  {
    content: "As Sarah reached the bottom of the staircase, she found herself in a vast underground chamber. Ancient artifacts lined the walls, and in the center stood a pedestal with a crystal that pulsed with an eerie blue glow, calling to her.",
    author: { username: "AdventureSeeker", _id: "fake3" }
  },
  {
    content: "The crystal's hypnotic pulsing seemed to sync with Sarah's heartbeat. Against her better judgment, she approached the pedestal, her hand reaching out as if controlled by some unseen force, drawn to touch the mysterious artifact.",
    author: { username: "FantasyFan88", _id: "fake4" }
  },
  {
    content: "Suddenly, the chamber filled with a blinding flash of light. When Sarah's vision cleared, she was no longer in the underground chamber but standing in a lush, alien landscape under two purple moons. How had she gotten here?",
    author: { username: "SciFiExplorer", _id: "fake5" }
  }
];

// Fake usernames for voting simulation
const FAKE_VOTERS = [
  "BookLover23", "TaleTeller", "WordSmith", "StoryFan", "NarrativeNinja",
  "PlotMaster", "CharacterCraft", "ImaginationHub", "CreativeCorner", "FictionForge"
];

export const TimerProvider = ({ children }) => {
  // Story timers: { storyId: { phase, endTime, submissions: [], winner: null } }
  const [storyTimers, setStoryTimers] = useState({});

  // Initialize a timer for a story
  const initializeTimer = useCallback((storyId) => {
    const now = Date.now();
    const endTime = now + SUBMISSION_DURATION;

    setStoryTimers((prev) => ({
      ...prev,
      [storyId]: {
        phase: PHASES.SUBMISSION,
        endTime,
        submissions: [],
        winner: null,
        startedAt: now,
        nextSubmissionTime: now + Math.random() * 20000 + 5000, // Random 5-25 seconds
        submissionIndex: 0,
      },
    }));
  }, []);

  // Generate fake submission at random intervals
  const generateFakeSubmission = useCallback((storyId) => {
    const now = Date.now();
    
    setStoryTimers((prev) => {
      const timer = prev[storyId];
      if (!timer || timer.phase !== PHASES.SUBMISSION || timer.submissionIndex >= FAKE_PARAGRAPHS.length) {
        return prev;
      }

      const paragraph = FAKE_PARAGRAPHS[timer.submissionIndex];
      const newSubmission = {
        id: `fake-${timer.submissionIndex}-${Date.now()}`,
        content: paragraph.content,
        author: paragraph.author,
        votes: { upvotes: 0, downvotes: 0 },
        createdAt: now,
        isVisible: true,
      };

      return {
        ...prev,
        [storyId]: {
          ...timer,
          submissions: [...timer.submissions, newSubmission],
          submissionIndex: timer.submissionIndex + 1,
          nextSubmissionTime: now + Math.random() * 25000 + 10000, // Next in 10-35 seconds
        },
      };
    });
  }, []);

  // Simulate fake voting during voting phase
  const simulateVoting = useCallback((storyId) => {
    setStoryTimers((prev) => {
      const timer = prev[storyId];
      if (!timer || timer.phase !== PHASES.VOTING || timer.submissions.length === 0) {
        return prev;
      }

      const updatedSubmissions = timer.submissions.map((submission) => {
        // Random chance to get a vote (30% chance per tick)
        if (Math.random() < 0.3) {
          const isUpvote = Math.random() < 0.75; // 75% chance of upvote
          const newVotes = { ...submission.votes };
          
          if (isUpvote) {
            newVotes.upvotes = (newVotes.upvotes || 0) + 1;
          } else {
            newVotes.downvotes = (newVotes.downvotes || 0) + 1;
          }

          return { ...submission, votes: newVotes };
        }
        return submission;
      });

      return {
        ...prev,
        [storyId]: {
          ...timer,
          submissions: updatedSubmissions,
        },
      };
    });
  }, []);

  // Add a submission during submission phase
  const addSubmission = useCallback((storyId, submission) => {
    setStoryTimers((prev) => {
      const timer = prev[storyId];
      if (!timer || timer.phase !== PHASES.SUBMISSION) {
        return prev;
      }

      return {
        ...prev,
        [storyId]: {
          ...timer,
          submissions: [...timer.submissions, {
            ...submission,
            id: `${Date.now()}-${Math.random()}`,
            votes: { upvotes: 0, downvotes: 0 },
            createdAt: Date.now(),
          }],
        },
      };
    });
  }, []);

  // Vote on a submission during voting phase
  const voteOnSubmission = useCallback((storyId, submissionId, voteType) => {
    setStoryTimers((prev) => {
      const timer = prev[storyId];
      if (!timer || timer.phase !== PHASES.VOTING) {
        return prev;
      }

      return {
        ...prev,
        [storyId]: {
          ...timer,
          submissions: timer.submissions.map((sub) => {
            if (sub.id === submissionId) {
              const newVotes = { ...sub.votes };
              
              // Handle vote logic
              if (voteType === 'upvote') {
                newVotes.upvotes = (newVotes.upvotes || 0) + 1;
              } else if (voteType === 'downvote') {
                newVotes.downvotes = (newVotes.downvotes || 0) + 1;
              }

              return { ...sub, votes: newVotes };
            }
            return sub;
          }),
        },
      };
    });
  }, []);

  // Get remaining time for current phase
  const getRemainingTime = useCallback((storyId) => {
    const timer = storyTimers[storyId];
    if (!timer) return 0;

    const now = Date.now();
    const remaining = Math.max(0, timer.endTime - now);
    return remaining;
  }, [storyTimers]);

  // Select winner based on votes
  const selectWinner = useCallback((storyId) => {
    setStoryTimers((prev) => {
      const timer = prev[storyId];
      if (!timer || timer.submissions.length === 0) {
        return prev;
      }

      // Find submission with highest net votes (upvotes - downvotes)
      const winner = timer.submissions.reduce((best, current) => {
        const currentScore = (current.votes.upvotes || 0) - (current.votes.downvotes || 0);
        const bestScore = (best.votes.upvotes || 0) - (best.votes.downvotes || 0);
        return currentScore > bestScore ? current : best;
      });

      return {
        ...prev,
        [storyId]: {
          ...timer,
          phase: PHASES.COMPLETED,
          winner,
        },
      };
    });
  }, []);

  // Update timer phases and handle fake submissions/voting
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setStoryTimers((prev) => {
        const updated = { ...prev };
        let hasChanges = false;

        Object.keys(updated).forEach((storyId) => {
          const timer = updated[storyId];
          
          // Handle fake submission generation
          if (timer.phase === PHASES.SUBMISSION && now >= timer.nextSubmissionTime) {
            hasChanges = true;
            generateFakeSubmission(storyId);
          }
          
          // Handle phase transitions
          if (timer.phase === PHASES.SUBMISSION && now >= timer.endTime) {
            // Submission phase ended, start voting
            hasChanges = true;
            updated[storyId] = {
              ...timer,
              phase: PHASES.VOTING,
              endTime: now + VOTING_DURATION,
            };
          } else if (timer.phase === PHASES.VOTING && now >= timer.endTime) {
            // Voting phase ended, select winner
            hasChanges = true;
            
            const winner = timer.submissions.length > 0
              ? timer.submissions.reduce((best, current) => {
                  const currentScore = (current.votes.upvotes || 0) - (current.votes.downvotes || 0);
                  const bestScore = (best.votes.upvotes || 0) - (best.votes.downvotes || 0);
                  return currentScore > bestScore ? current : best;
                })
              : null;

            updated[storyId] = {
              ...timer,
              phase: PHASES.COMPLETED,
              winner,
            };
          }
          
          // Handle fake voting simulation
          if (timer.phase === PHASES.VOTING) {
            simulateVoting(storyId);
          }
        });

        return hasChanges ? updated : prev;
      });
    }, 2000); // Check every 2 seconds for more realistic simulation

    return () => clearInterval(interval);
  }, [generateFakeSubmission, simulateVoting]);

  // Add winning paragraph to actual story
  const addWinnerToStory = useCallback(async (storyId, winner, onParagraphAdded) => {
    if (!winner || !onParagraphAdded) return;

    try {
      const paragraphData = {
        storyId,
        content: winner.content,
      };
      
      await onParagraphAdded(paragraphData);
      
      // Mark timer as completed and clear submissions
      setStoryTimers((prev) => ({
        ...prev,
        [storyId]: {
          ...prev[storyId],
          submissions: [],
          winner: null,
          submissionIndex: 0,
        },
      }));
    } catch (error) {
      console.error('Error adding winner to story:', error);
    }
  }, []);

  const value = {
    storyTimers,
    initializeTimer,
    addSubmission,
    voteOnSubmission,
    getRemainingTime,
    selectWinner,
    addWinnerToStory,
    PHASES,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export default TimerContext;
