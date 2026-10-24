const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', require('./routes/tasks'));

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

module.exports = app;
