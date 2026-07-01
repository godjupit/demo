CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS agent_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  tone TEXT NOT NULL,
  values JSONB NOT NULL DEFAULT '[]'::jsonb,
  boundaries JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  source_type TEXT NOT NULL,
  person_id TEXT,
  content TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'public',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chunks (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  person_id TEXT,
  text TEXT NOT NULL,
  embedding vector(2048),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id TEXT NOT NULL,
  user_id TEXT,
  agent_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sources_person_id_idx
  ON sources(person_id);

CREATE INDEX IF NOT EXISTS chunks_person_id_idx
  ON chunks(person_id);

CREATE INDEX IF NOT EXISTS chunks_metadata_gin_idx
  ON chunks USING gin (metadata);

CREATE INDEX IF NOT EXISTS conversations_thread_id_idx
  ON conversations(thread_id);

CREATE UNIQUE INDEX IF NOT EXISTS conversations_thread_agent_idx
  ON conversations(thread_id, agent_id);
