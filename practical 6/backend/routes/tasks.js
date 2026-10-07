const router = require('express').Router();
const Task = require('../models/Task');

router.get('/', async (req, res, next) => {
    try {
        res.json(await Task.find().sort({ createdAt: -1 }));
    } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
    try {
        res.status(201).json(await Task.create(req.body));
    } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) { next(err); }
});

module.exports = router;
