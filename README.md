# Constellia - Community Agent

面向社区知识管理、成员问答与多角色圆桌讨论的 AI Agent 应用。项目以 B Community 成员资料为知识基础，结合 RAG、对话记忆与角色化提示词，让用户可以围绕社区实践、组织经验和人物资料进行可追溯的对话与讨论。

当前仓库包含完整的前后端、本地知识库导入脚本、PostgreSQL/pgvector schema、圆桌讨论接口与基础 Web 界面，适合作为社区知识产品、研究型 Agent 或多角色讨论系统的原型底座继续迭代。

## 核心能力

- **社区知识问答**：基于本地 Markdown、PDF、DOCX 等资料构建 RAG 检索链路，回答时返回引用片段。
- **成员一对一对话**：按 `speaker_id` 过滤检索范围，让每位成员只基于自己的资料进行回答。
- **多角色圆桌讨论**：支持选择 3 位社区成员围绕同一主题发言，并生成主持人计划与总结。
- **流式输出**：圆桌讨论与追问接口支持 SSE 流式返回，提升前端交互体验。
- **对话记忆持久化**：使用 PostgreSQL 保存普通问答、成员对话和圆桌讨论历史。
- **可扩展数据层**：通过 `data/<person_id>/` 与 `_manifest.json` 管理成员资料，便于持续增量导入。

## 技术栈

| 模块 | 技术 |
| --- | --- |
| 前端 | Next.js 15、React 19、TypeScript、Lucide React |
| 后端 | FastAPI、Pydantic、LangGraph、LangChain Core |
| 模型服务 | OpenAI-compatible Chat API、OpenAI-compatible Embedding API |
| 数据库 | PostgreSQL 16、pgvector、psycopg |
| 文档解析 | Markdown/TXT、PDF、DOCX |
| 本地编排 | Docker Compose |

## 系统架构

```text
User Browser
  |
  |  Next.js pages and API client
  v
Frontend
  |
  |  HTTP / SSE
  v
FastAPI Backend
  |
  |-- LangGraph chat agent
  |-- Roundtable speaker orchestration
  |-- RAG retriever
  |-- Conversation persistence
  |
  v
PostgreSQL + pgvector
  |
  v
Local knowledge sources under data/
```

## 目录结构

```text
.
├── backend/
│   ├── app/
│   │   ├── agents/        # 普通问答 Agent：状态、图、提示词与节点
│   │   ├── api/           # FastAPI 路由
│   │   ├── core/          # 应用配置
│   │   ├── db/            # PostgreSQL 连接、schema 与对话存储
│   │   ├── knowledge/     # 文档加载、切块、embedding 与 pgvector 检索
│   │   └── roundtable/    # 圆桌讨论角色、提示词与编排逻辑
│   ├── data/              # 后端内置 Agent profile 与示例知识源
│   ├── scripts/           # 数据库初始化、知识导入、烟雾测试脚本
│   └── requirements.txt
├── frontend/
│   ├── app/               # Next.js App Router 页面
│   ├── components/        # 前端组件
│   ├── lib/               # API client 与前端数据定义
│   └── package.json
├── data/                  # B Community 成员资料源文件
├── information/           # 原始整理资料与 RAG 中间材料
├── docker-compose.yml
└── README.md
```

## 环境要求

- Python 3.10+，推荐 Python 3.11
- Node.js 20+
- Docker Desktop 或 Docker Engine
- 可用的 Chat API Key
- 可用的 Embedding API Key


## 快速开始

### 1. 启动 PostgreSQL + pgvector

```bash
docker compose up -d postgres
```

当前 `docker-compose.yml` 将容器内 PostgreSQL `5432` 端口映射到宿主机 `55432`。如果后端从宿主机或 WSL 连接 Docker 服务，推荐使用：

```bash
DATABASE_URL=postgresql://community:community@localhost:55432/community_agents
```

### 2. 配置并启动后端

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

编辑 `backend/.env`，至少配置：

```bash
OPENAI_API_KEY=your-chat-api-key
OPENAI_URL=https://your-chat-endpoint/v1
OPENAI_CHAT_MODEL=your-chat-model

OPENAI_EMBEDDING_API_KEY=your-embedding-api-key
OPENAI_EMBEDDING_URL=https://your-embedding-endpoint/v1
OPENAI_EMBEDDING_MODEL=your-embedding-model
OPENAI_EMBEDDING_DIMENSIONS=2048

DATABASE_URL=postgresql://community:community@localhost:55432/community_agents
FRONTEND_ORIGIN=http://localhost:3000
```

初始化数据库：

```bash
PYTHONPATH=. python scripts/init_db.py
```

导入成员知识库：

```bash
PYTHONPATH=. python scripts/ingest_bcommunity_rag.py
```

启动后端服务：

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

健康检查：

```bash
curl http://localhost:8000/health
```

### 3. 配置并启动前端

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

默认前端地址：

```text
http://localhost:3000
```

默认后端地址：

```text
http://localhost:8000
```

## 数据组织与导入

知识库源文件位于根目录 `data/`。每位成员一个目录，并通过 `_manifest.json` 声明资料归属。

```text
data/
├── rect_repair/
│   ├── EP19  逐字稿.md
│   ├── 官网.md
│   ├── 修四边形公众号/
│   │   └── 茶水间_2_回顾.md
│   └── _manifest.json
├── fang_chenchu/
│   ├── 晨初 & 假杂志检索.md
│   └── _manifest.json
└── luneurs/
    ├── Luneurs_另类成长.md
    └── _manifest.json
```

导入脚本会读取 `.md`、`.txt`、`.pdf`、`.docx` 文件，将内容切分为 chunks，生成 embedding，并写入 PostgreSQL：

- `sources`：每个原始文件一条来源记录。
- `chunks`：切分后的文本片段与向量。
- `metadata`：保留 `user_id`、`person_id`、`source_file`、`page`、`chunk_index` 等字段。

验证导入结果：

```bash
curl http://localhost:8000/api/rag/people

curl -X POST http://localhost:8000/api/rag/search \
  -H "Content-Type: application/json" \
  -d '{"person_id":"rect_repair","query":"修四边形为什么关注城市游戏？","limit":3}'
```

## API 概览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/health` | 后端健康检查 |
| `POST` | `/api/chat` | 普通单 Agent 问答 |
| `GET` | `/api/conversations/{agent_id}/{thread_id}` | 恢复指定线程的对话历史 |
| `GET` | `/api/rag/people` | 查看已导入成员与 chunk 数量 |
| `POST` | `/api/rag/search` | 测试 RAG 向量检索 |
| `GET` | `/api/roundtable/speakers` | 获取圆桌成员列表与地图位置 |
| `POST` | `/api/roundtable` | 发起一次圆桌讨论 |
| `POST` | `/api/roundtable/speaker-chat` | 与某位成员进行一对一对话 |
| `POST` | `/api/roundtable/stream` | 流式圆桌讨论 |
| `POST` | `/api/roundtable/followup/stream` | 针对某位成员的流式追问 |

普通问答示例：

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"agent_id":"xiu_sibianxing","message":"修四边形为什么关注社区？","thread_id":null,"messages":[]}'
```

## 开发命令

后端：

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
PYTHONPATH=. python scripts/smoke_chat.py
```

前端：

```bash
cd frontend
npm run dev
npm run lint
npm run build
```

数据库：

```bash
docker compose up -d postgres
docker compose logs -f postgres
docker compose down
```

## 对话记忆

系统会将对话写入 PostgreSQL 的 `conversations` 表：

- 普通问答：按 `agent_id + thread_id` 保存。
- 首页地图成员对话：按 `roundtable-speaker:{speaker_id} + thread_id` 保存。
- 圆桌讨论：按 `roundtable + thread_id` 保存。

如果只需要对话记忆而不启用向量检索，可以只应用 `memory_schema.sql`。完整 RAG 能力需要启用 `schema.sql` 中的 pgvector 扩展与向量表。

## 配置说明

后端读取 `backend/.env`：

| 变量 | 说明 |
| --- | --- |
| `APP_NAME` | FastAPI 应用名称 |
| `APP_ENV` | 运行环境标识 |
| `OPENAI_API_KEY` | Chat API Key |
| `OPENAI_URL` | Chat API Base URL |
| `OPENAI_CHAT_MODEL` | Chat 模型名称 |
| `OPENAI_EMBEDDING_API_KEY` | Embedding API Key；为空时可回退到 Chat Key |
| `OPENAI_EMBEDDING_URL` | Embedding API Base URL |
| `OPENAI_EMBEDDING_MODEL` | Embedding 模型名称 |
| `OPENAI_EMBEDDING_DIMENSIONS` | 向量维度，需与数据库 schema 和模型输出一致 |
| `DATABASE_URL` | PostgreSQL 连接串 |
| `FRONTEND_ORIGIN` | CORS 允许的前端源 |

前端读取 `frontend/.env.local`：

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_AGENT_API_URL` | FastAPI 后端地址，默认 `http://localhost:8000` |

