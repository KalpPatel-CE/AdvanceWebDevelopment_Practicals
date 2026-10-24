const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

test('GET /tasks returns 200 with empty array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(999);
    expect(Array.isArray(res.body)).toBe(true);
});

test('POST /tasks creates a task and returns 201', async () => {
    const res = await request(app)
        .post('/tasks')
        .send({ title: 'Test Task', priority: 'high' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
    expect(res.body.priority).toBe('high');
});
