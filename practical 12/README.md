# Practical 12 – CI/CD Pipeline with GitHub Actions

## Pipeline Architecture

```
git push origin main
        │
        ▼
GitHub Actions Trigger (on: push to main)
        │
        ▼
Job: build-and-test (ubuntu-latest)
  ├── Checkout code
  ├── Setup Node.js 18
  ├── npm install
  └── npm test  ──► pass ✅  or  fail ❌
```

## Run tests locally

```bash
cd backend
npm install
npm test
```

## Tests

| Test | Endpoint | Assertion |
|---|---|---|
| GET /tasks returns 200 | `GET /tasks` | status 200, body is array |
| POST /tasks creates a task | `POST /tasks` | status 201, correct title & priority |

Tests use `mongodb-memory-server` — no real MongoDB needed in CI.

## Demonstrating a failed pipeline

1. Open `backend/__tests__/tasks.test.js`
2. Change `expect(res.statusCode).toBe(200)` → `expect(res.statusCode).toBe(999)`
3. Commit and push → pipeline turns **red ❌**
4. Revert the change, commit and push → pipeline turns **green ✅**

## Key Questions

| Question | Answer |
|---|---|
| CI vs CD — which does this practical demonstrate? | Continuous Integration only. The pipeline installs dependencies and runs tests but does not deploy anywhere. |
| Why catch bugs on every push rather than before release? | The longer a bug lives in the codebase, the more code is built on top of it. Catching it immediately on push keeps the main branch always in a working state. |
| Wrong test file path — same failure step as a real test failure? | No. A wrong path causes `npm test` to exit with "no tests found", which fails at the test runner startup step, before any test assertions run. |

## Status Badge

Add this to the top of your README (replace `<owner>` and `<repo>`):

```markdown
![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)
```
