require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', require('./routes/tasks'));

// Global error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.fromEntries(
            Object.entries(err.errors).map(([k, v]) => [k, v.message])
        );
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID' });
    res.status(500).json({ message: 'Internal server error' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () =>
            console.log(`Server running on port ${process.env.PORT || 5000}`)
        );
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
