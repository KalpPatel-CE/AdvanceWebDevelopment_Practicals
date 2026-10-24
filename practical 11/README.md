# Practical 11 – Containerization with Docker and Docker Compose

## Architecture

```
docker-compose.yml
├── frontend  (React, multi-stage build, vite preview, port 5173)
└── backend   (Node/Express, port 5000)

Network : app-network (bridge)
frontend ──► backend ──► MongoDB Atlas (cloud)
```

## Run the full stack

```bash
docker-compose up --build
```

All three containers start together. No manual steps required.

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/tasks
## Stop and remove containers

```bash
docker-compose down
```

## Key Design Decisions

| Question | Answer |
|---|---|
| Why `mongodb` instead of `localhost` in the connection string? | Each container has its own network namespace. `localhost` inside the backend container refers to the backend itself, not MongoDB. Docker Compose creates a shared bridge network where services are reachable by their service name. Since we use MongoDB Atlas, the connection string is an `mongodb+srv://` URI that resolves over the internet — no service name needed. |
| `EXPOSE` vs `ports` in Compose? | `EXPOSE` is documentation — it tells Docker which port the process listens on inside the container. `ports` in Compose actually publishes that port to the host machine so you can reach it from a browser. |
| Why not copy `node_modules` into the image? | `node_modules` contains platform-specific binaries. Copying from a Windows host into a Linux container breaks them. Running `npm install` inside the container ensures correct binaries and keeps the build context small. |

## Supplementary Features Implemented

- `.dockerignore` in both `frontend/` and `backend/` excludes `node_modules` and `.env`
- Multi-stage build for the React frontend (build stage → serve stage)
- MongoDB Atlas used as the database — no local MongoDB container required
