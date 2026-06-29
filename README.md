# Community Agent Prototype

First-pass prototype for a community AI agent module.

Stack:

- Frontend: Next.js
- Agent service: Python + FastAPI + LangGraph
- Database target: PostgreSQL + pgvector
- MVP knowledge source: local files under `backend/data`

The first version focuses on a single role-based agent. Map and graph modules are intentionally left out of the runtime, but the data model keeps `person`, `event`, `place`, `value`, and `source` concepts so those modules can be added later.

## Project Layout

```text
backend/
  app/
    agents/       LangGraph state, graph, prompts, nodes
    api/          FastAPI routes
    core/         settings
    db/           future PostgreSQL hooks
    knowledge/    file loader, chunking, retrieval
  data/
    agents/       agent profiles
    sources/      markdown knowledge sources
frontend/
  app/            Next.js app router
  lib/            API client
docker-compose.yml
```

## Backend

Create a virtual environment and install dependencies:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Health check:

```bash
curl http://localhost:8000/health
```

Smoke test without HTTP:

```bash
cd backend
PYTHONPATH=. python scripts/smoke_chat.py
```

Chat endpoint:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"agent_id":"xiu_sibianxing","message":"修四边形为什么关注社区？"}'
```

## Frontend

Node.js is required.

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## PostgreSQL + pgvector

The MVP reads local files so you can validate the agent experience quickly. PostgreSQL is included for the next step.

```bash
docker compose up -d postgres
```

Connection string:

```text
postgresql://community:community@localhost:5432/community_agents
```

The schema draft lives at `backend/app/db/schema.sql`.
