require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const Task = require('./models/Task');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    })

app.get('/tasks', async (req, res, next) => {
    try {
        const tasks = await Task.find();
        return res.json(tasks);

    }catch (err) {
        next(err);
    }
});

app.post('/tasks', async (req, res, next) => {
    try {
        const task = await Task.create(req.body);

        return res.status(201).json(task);

    } catch (err) {
        next(err);
    }
});

app.put('/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        return res.json(task);

    } catch (err) {
        next(err);
    }
});

app.delete('/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        return res.json({
            message: 'Deleted Successfully!'
        });

    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err);

    if (err.name === 'ValidationError') {

        const errors = {};

        for (const field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.status(400).json({
            message: 'Validation failed',
            errors: errors
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid task ID'
        });
    }

    return res.status(500).json({
        message: 'Internal server error'
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Successful connection on PORT 5000");
})