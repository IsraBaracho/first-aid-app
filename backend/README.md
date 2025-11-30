# first-aid-backend

Backend mock for the first-aid-app. Minimal Express server that serves emergency data from `data/emergencies.json`.

Setup

1. Install dependencies

```bash
cd backend
npm install
```

2. Run in development (with nodemon)

```bash
npm run dev
```

3. Endpoints

- `GET /api/emergencies` — list all emergencies
- `GET /api/emergencies/:id` — get a single emergency by `id` or `slug`
- `GET /health` — health check

This is a minimal mock server to help frontend development. In production replace with a real backend.
