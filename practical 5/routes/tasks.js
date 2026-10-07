const router = require('express').Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) { next(err); }
});

// GET single task by ID
router.get('/:id', async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) { next(err); }
});

// POST create task
router.post('/', async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) { next(err); }
});

// PUT update task
router.put('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) { next(err); }
});

// DELETE task
router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) { next(err); }
});

module.exports = router;
