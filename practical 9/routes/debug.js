const router = require('express').Router();
const { cache, stats } = require('../cache');

// GET /debug/cache — cache hit/miss stats and live keys
router.get('/cache', (req, res) => {
    res.json({
        hits: stats.hits,
        misses: stats.misses,
        keys: cache.keys(),
        stats: cache.getStats()
    });
});

module.exports = router;
