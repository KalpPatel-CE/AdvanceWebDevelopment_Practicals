const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { cache, stats } = require('../cache');

const ALL_TASKS_KEY = 'all_tasks';
const taskKey = (id) => `task_${id}`;

router.use(auth);

// GET /tasks — cache all tasks
router.get('/', async (req, res, next) => {
    try {
        const cached = cache.get(ALL_TASKS_KEY);
        if (cached) {
            stats.hits++;
            return res.json(cached);
        }
        stats.misses++;
        const tasks = await Task.find({ user: req.user.id });
        cache.set(ALL_TASKS_KEY, tasks);
        return res.json(tasks);
    } catch (err) { next(err); }
});

// GET /tasks/:id — cache individual task
router.get('/:id', async (req, res, next) => {
    try {
        const key = taskKey(req.params.id);
        const cached = cache.get(key);
        if (cached) {
            stats.hits++;
            return res.json(cached);
        }
        stats.misses++;
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        cache.set(key, task);
        return res.json(task);
    } catch (err) { next(err); }
});

// POST /tasks — create and invalidate all-tasks cache
router.post('/', validate, async (req, res, next) => {
    try {
        const task = await Task.create({ ...req.body, user: req.user.id });
        cache.del(ALL_TASKS_KEY);
        return res.status(201).json(task);
    } catch (err) { next(err); }
});

// PUT /tasks/:id — update and invalidate both caches
router.put('/:id', validate, async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        cache.del(ALL_TASKS_KEY);
        cache.del(taskKey(req.params.id));
        return res.json(task);
    } catch (err) { next(err); }
});

// DELETE /tasks/:id — delete and invalidate both caches
router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        cache.del(ALL_TASKS_KEY);
        cache.del(taskKey(req.params.id));
        return res.json({ message: 'Deleted successfully' });
    } catch (err) { next(err); }
});

module.exports = router;
