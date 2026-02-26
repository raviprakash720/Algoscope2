const mongoose = require('mongoose');

const mistakeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    problemId: {
        type: Number,
        required: true,
        index: true
    },
    pattern: {
        type: String,
        required: false
    },
    mistakeType: {
        type: String,
        required: true,
        enum: ['wrong_output', 'runtime_error']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for efficient querying
mistakeSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Mistake', mistakeSchema);