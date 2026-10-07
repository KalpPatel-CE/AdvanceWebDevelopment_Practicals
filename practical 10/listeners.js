const taskEvents = require('./events');

taskEvents.on('task-created', (task) => {
    // Simulate slow async work to prove non-blocking behavior
    setTimeout(() => {
        console.log(`[Notification] Task "${task.title}" created at ${new Date().toISOString()} | Assigned user: ${task.user}`);
    }, 2000);
});

taskEvents.on('task-deleted', (task) => {
    console.log(`[Notification] Task "${task.title}" deleted at ${new Date().toISOString()} | User: ${task.user}`);
});

taskEvents.on('error', (err) => {
    console.error(`[EventEmitter Error] ${err.message}`);
});
