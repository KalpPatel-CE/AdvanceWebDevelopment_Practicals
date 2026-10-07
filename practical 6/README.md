# Practical 6 – Full Stack Integration: React + Node + MongoDB

## Running Locally

### Backend (Terminal 1)
```bash
cd backend
npm install
# Ensure MongoDB is running locally
npm start
# Server starts on http://localhost:5000
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
# App opens on http://localhost:5173
```

## API Endpoints
| Method | Endpoint      | Description        |
|--------|---------------|--------------------|
| GET    | /tasks        | Get all tasks      |
| GET    | /tasks/:id    | Get task by ID     |
| POST   | /tasks        | Create a task      |
| PUT    | /tasks/:id    | Update a task      |
| DELETE | /tasks/:id    | Delete a task      |

## Environment Variables (backend/.env)
```
MONGO_URI=mongodb://localhost:27017/taskdb_p6
PORT=5000
```
