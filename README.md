# BFHL — Graph Hierarchy Analyzer

Chitkara Full Stack Engineering Challenge.

## Structure

```
antib/
├── backend/    # Vercel Serverless Function  →  deploy as Project 1
└── frontend/   # React + Vite + Tailwind     →  deploy as Project 2
```

## Deploy

### 1. Backend (deploy first)

```bash
cd backend
vercel --prod
# Note the URL, e.g. https://chitkara-bfhl-backend.vercel.app
```

> Set env var in Vercel dashboard (optional):
> `FRONTEND_URL` = your frontend URL (restricts CORS)

### 2. Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env → set VITE_API_URL=https://chitkara-bfhl-backend.vercel.app
vercel --prod
```

> Set env var in Vercel dashboard:
> `VITE_API_URL` = your backend URL (no trailing slash)

## Local Dev

```bash
# Terminal 1 — backend (needs Vercel CLI)
cd backend && vercel dev   # runs on http://localhost:3001

# Terminal 2 — frontend
cd frontend
echo "VITE_API_URL=http://localhost:3001" > .env
npm install && npm run dev
```

## API

`POST /bfhl` — accepts `{ "data": ["A->B", "A->C"] }`, returns hierarchies, cycles, invalid entries, duplicates, and summary.
