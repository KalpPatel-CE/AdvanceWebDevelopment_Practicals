const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

// All task routes are protected
router.use(auth);

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        return res.json(tasks);
    } catch (err) { next(err); }
});

router.post('/', validate, async (req, res, next) => {
    try {
        const task = await Task.create({ ...req.body, user: req.user.id });
        return res.status(201).json(task);
    } catch (err) { next(err); }
});

router.put('/:id', validate, async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        return res.json(task);
    } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        return res.json({ message: 'Deleted successfully' });
    } catch (err) { next(err); }
});

module.exports = router;
