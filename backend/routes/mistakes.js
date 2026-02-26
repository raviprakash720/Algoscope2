const express = require('express');
const router = express.Router();
const Mistake = require('../models/Mistake');

// POST /api/mistakes
// Saves a mistake entry
router.post('/', async (req, res) => {
    const { userId, problemId, pattern, mistakeType } = req.body;

    try {
        const mistake = new Mistake({
            userId,
            problemId,
            pattern,
            mistakeType
        });

        await mistake.save();
        res.status(201).json(mistake);
    } catch (err) {
        console.error('Error saving mistake:', err);
        res.status(500).json({ error: 'Failed to save mistake' });
    }
});

// GET /api/mistakes/:userId
// Returns all mistakes for that user, sorted by newest first
router.get('/:userId', async (req, res) => {
    try {
        const mistakes = await Mistake.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });
        res.json(mistakes);
    } catch (err) {
        console.error('Error fetching mistakes:', err);
        res.status(500).json({ error: 'Failed to fetch mistakes' });
    }
});

module.exports = router;