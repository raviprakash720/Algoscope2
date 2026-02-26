const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const {
  generateTwoSumSteps,
  generateSlidingWindowSteps,
  generateLinkedListSteps,
  generateMedianSteps,
  generatePalindromeSteps,
  generateZigzagSteps,
  generateReverseIntegerSteps,
  generateAtoiSteps,
  generatePalindromeNumberSteps,
  generateRegexSteps,
  generateContainerSteps
} = require('./utils/stepGenerator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log('🚀 Starting Algoscope Backend Server...');
console.log(`🔧 Port: ${PORT}`);
console.log(`🌐 CORS: Enabled`);
console.log(`📄 JSON Parser: Enabled`);

const parseInput = (input) => {
  if (!input) return [];
  try {
    const cleaned = String(input).trim();
    if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
      return JSON.parse(cleaned);
    }
    // Fallback: comma separated
    return cleaned.split(',').map(s => {
      const val = s.trim();
      return isNaN(Number(val)) ? (val === 'true' ? true : (val === 'false' ? false : val)) : Number(val);
    });
  } catch (e) {
    return [];
  }
};

const problemsPath = path.join(__dirname, 'data', 'problems.json');
const mongoose = require('mongoose');

// MongoDB Connection with better error handling
console.log('🔄 Attempting MongoDB connection...');
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/algoscope';
console.log(`🔗 MongoDB URI: ${mongoUri}`);

let dbConnected = false;

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  dbConnected = true;
})
.catch(err => {
  console.error('❌ MongoDB Connection Failed:', err.message);
  console.log('⚠️  Backend will run in offline mode - database features disabled');
  console.log('💡 To enable database features, start MongoDB server on localhost:27017');
});

// Connection status monitoring
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err);
  dbConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB Disconnected');
  dbConnected = false;
});

mongoose.connection.on('reconnected', () => {
  console.log('🔁 MongoDB Reconnected');
  dbConnected = false;
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend working 🚀" });
});

// Routes
const progressRoutes = require('./routes/progress');
const mistakeRoutes = require('./routes/mistakes');
app.use('/api/progress', progressRoutes);
app.use('/api/mistakes', mistakeRoutes);

app.get('/api/problems', (req, res) => {
  fs.readFile(problemsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read problems data' });
    }
    const problems = JSON.parse(data);
    // Strip heavy steps data for list view
    const metadata = problems.map(({ brute_force_steps, optimal_steps, ...rest }) => rest);
    res.json(metadata);
  });
});

app.get('/api/problems/:slug', (req, res) => {
  const slugOrId = req.params.slug;
  fs.readFile(problemsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read problems data' });
    }
    const problems = JSON.parse(data);
    const problem = problems.find(p => p.slug === slugOrId || p.id === parseInt(slugOrId));
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(problem);
  });
});

app.post('/api/problems/:id/steps', (req, res) => {
  const id = parseInt(req.params.id);
  const { input, target } = req.body;

  try {
    if (id === 1) {
      const nums = parseInput(input);
      const targetVal = parseInt(target);
      const { bruteForceSteps, optimalSteps } = generateTwoSumSteps(nums, targetVal);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 2) {
      const l1 = parseInput(input);
      const l2 = parseInput(target); // target used for l2 in this case
      const { bruteForceSteps, optimalSteps } = generateLinkedListSteps(l1, l2);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 3) {
      const s = typeof input === 'string' ? input : JSON.stringify(input).replace(/^"|"$/g, '');
      const { bruteForceSteps, optimalSteps } = generateSlidingWindowSteps(s, target);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 4) {
      const nums1 = parseInput(input);
      const nums2 = parseInput(target);
      const { bruteForceSteps, optimalSteps } = generateMedianSteps(nums1, nums2);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 5) {
      const s = typeof input === 'string' ? input : JSON.stringify(input).replace(/^"|"$/g, '');
      const { bruteForceSteps, optimalSteps } = generatePalindromeSteps(s);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 6) {
      const s = typeof input === 'string' ? input : JSON.stringify(input).replace(/^"|"$/g, '');
      const numRows = parseInt(target);
      const { bruteForceSteps, optimalSteps } = generateZigzagSteps(s, numRows);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 7) {
      const x = parseInt(input);
      const { bruteForceSteps, optimalSteps } = generateReverseIntegerSteps(x);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 8) {
      const s = typeof input === 'string' ? input : JSON.stringify(input).replace(/^"|"$/g, '');
      const { bruteForceSteps, optimalSteps } = generateAtoiSteps(s);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 9) {
      const x = parseInt(input);
      const { bruteForceSteps, optimalSteps } = generatePalindromeNumberSteps(x);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 10) {
      const s = typeof input === 'string' ? input : JSON.stringify(input).replace(/^"|"$/g, '');
      const p = typeof target === 'string' ? target : JSON.stringify(target).replace(/^"|"$/g, '');
      const { bruteForceSteps, optimalSteps } = generateRegexSteps(s, p);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    if (id === 11) {
      const heights = parseInput(input);
      const { bruteForceSteps, optimalSteps } = generateContainerSteps(heights);
      return res.json({ bruteForceSteps, optimalSteps });
    }

    res.status(501).json({ error: 'Dynamic steps not yet implemented for this problem.' });
  } catch (e) {
    res.status(400).json({ error: 'Invalid input format.' });
  }
});

app.listen(PORT, () => {
  console.log('=====================================');
  console.log('🚀 ALGOSCOPE BACKEND SERVER STARTED');
  console.log('=====================================');
  console.log(`📡 Server running on port: ${PORT}`);
  console.log(`🔗 Base URL: http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Problems API: http://localhost:${PORT}/api/problems`);
  console.log(`🔗 Mistakes API: http://localhost:${PORT}/api/mistakes/test_user_1`);
  console.log(`🔗 Progress API: http://localhost:${PORT}/api/progress/test_user_1`);
  console.log('=====================================');
  
  // Check MongoDB status after startup
  setTimeout(() => {
    if (dbConnected) {
      console.log('✅ Database: Connected and ready');
    } else {
      console.log('⚠️  Database: Offline mode (some features limited)');
    }
    console.log('=====================================');
  }, 1000);
});
