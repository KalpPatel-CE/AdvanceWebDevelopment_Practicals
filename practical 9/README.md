# Practical 9 — In-Memory Caching and Query Optimization

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm start
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login, get JWT |
| GET | /tasks | Get all tasks (cached) |
| GET | /tasks/:id | Get single task (cached) |
| POST | /tasks | Create task (invalidates cache) |
| PUT | /tasks/:id | Update task (invalidates cache) |
| DELETE | /tasks/:id | Delete task (invalidates cache) |
| GET | /debug/cache | Cache hit/miss stats |

## Caching Architecture

```
GET /tasks
    |
    v
Cache check (node-cache, TTL=60s)
    ├── HIT  → return cached data immediately
    └── MISS → query MongoDB → store in cache → return data

POST / PUT / DELETE /tasks
    |
    v
Write to MongoDB → cache.del('all_tasks') + cache.del('task_<id>')
```

## Response Time Comparison

> Readings taken with Postman on a local MongoDB instance with 20 seed documents.
> All requests authenticated with a valid JWT.

### GET /tasks — Without Caching (direct MongoDB query)

| Reading | Response Time (ms) |
|---------|--------------------|
| 1 | 45 |
| 2 | 38 |
| 3 | 42 |
| **Average** | **41.7 ms** |

### GET /tasks — With Caching (cache HIT, 2nd+ request within TTL)

| Reading | Response Time (ms) |
|---------|--------------------|
| 1 | 4 |
| 2 | 3 |
| 3 | 3 |
| **Average** | **3.3 ms** |

> ~92% reduction in response time on cache hits.

## Key Analysis Answers

**Why must the cache be invalidated on every write?**
The cache stores a snapshot of the DB at a point in time. If a task is created, updated, or deleted without invalidating the cache, subsequent GET requests return stale data until the TTL expires — users would see tasks that no longer exist or miss newly created ones.

**What is a reasonable TTL for a task management app?**
60 seconds is a reasonable default. A shorter TTL (e.g. 5s) reduces staleness risk but eliminates most cache benefit. A longer TTL (e.g. 10 min) maximises performance but increases the window where stale data could be served if invalidation logic has a bug. The trade-off is: longer TTL = better performance, higher staleness risk.

**Why is node-cache unsuitable for multi-instance deployments?**
node-cache stores data in the Node.js process's own memory. If the app runs on two server instances, each has its own independent cache. A write on instance A invalidates only instance A's cache; instance B continues serving stale data. A shared external cache (Redis, Memcached) is required for multi-instance correctness.

## Known Limitations

- Cache is wiped on every server restart (in-memory, not persistent).
- Cache is per-user-agnostic — `all_tasks` key stores tasks for the first user who populates it. For a production app, the cache key should include the user ID (e.g. `all_tasks_<userId>`).
