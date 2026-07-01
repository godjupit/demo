# Community Agent Prototype

这是一个面向社区知识问答与圆桌讨论的原型项目。当前版本已经打通前后端和本地文件数据源，适合在 WSL2 中直接跑通并继续迭代。

## 项目内容

项目分成三层：

- 前端：基于 Next.js 的交互界面，负责对话、圆桌和结果展示。
- 后端：基于 Python、FastAPI 和 LangGraph 的 Agent 服务，负责接收请求、检索上下文和生成回答。
- 数据层：当前以本地 Markdown 和 Agent Profile 为主。

当前仓库里已经包含这些入口：

- `/api/chat`：单轮问答接口。
- `/api/conversations/{agent_id}/{thread_id}`：按 thread 恢复持久化对话。
- `/api/roundtable`：圆桌讨论接口。
- `/api/roundtable/speakers`：圆桌角色与地图位置接口。
- `/api/roundtable/speaker-chat`：地图角色的一对一对话接口。
- `/api/roundtable/stream`：圆桌流式输出接口。
- `/api/roundtable/followup/stream`：针对某位 speaker 的追问流式接口。
- `/health`：后端健康检查。

## 目录结构

```text
backend/
  app/
    agents/       LangGraph 状态、图、提示词和节点
    api/          FastAPI 路由
    core/         配置
    knowledge/    文件加载、切块、检索
  data/
    agents/       Agent 配置文件
    sources/      社区知识源 Markdown
  scripts/        本地烟雾测试脚本
frontend/
  app/            Next.js App Router 页面
  lib/            前端 API Client
docker-compose.yml
```

## WSL2 环境准备

如果你现在是在 WSL2 里开发，推荐直接用 VS Code 的 Remote - WSL 打开仓库目录，例如 `/home/godjupit/lib`。这样 Python、Node.js 和 Docker 命令都会在同一个 Linux 环境里执行，避免 Windows 和 WSL 混用导致的路径、换行和依赖问题。

建议准备这些基础环境：

- Ubuntu / Debian 系的 WSL2 发行版
- Python 3.10+，建议 3.11 或更高
- Node.js 20+
- Docker Desktop，并开启 WSL Integration，或者直接在 WSL2 中可用的 Docker Engine

如果你从 Windows 侧访问浏览器，通常直接打开 `http://localhost:3000` 和 `http://localhost:8000` 即可；如果网络转发有差异，也可以优先在 WSL2 里启动服务并在本机浏览器访问。

## 后端配置

进入后端目录并创建虚拟环境：

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

后端环境变量说明如下：

- `OPENAI_API_KEY`：聊天模型 API Key。
- `OPENAI_URL`：可选，聊天模型服务地址。
- `OPENAI_CHAT_MODEL`：默认聊天模型名，当前示例为 `gpt-4o-mini`。
- `OPENAI_EMBEDDING_API_KEY`：可选，Embedding 模型 API Key；不填时回退到 `OPENAI_API_KEY`。
- `OPENAI_EMBEDDING_URL`：可选，Embedding 模型服务地址；不填时回退到 `OPENAI_URL`。
- `OPENAI_EMBEDDING_MODEL`：Embedding 模型名，默认 `text-embedding-3-small`。
- `DATABASE_URL`：PostgreSQL 连接地址，默认 `postgresql://community:community@localhost:5432/community_agents`。
- `FRONTEND_ORIGIN`：前端访问源，用于 CORS 配置。

## PostgreSQL + pgvector 知识库

当前版本支持把 `data/<person_id>/` 下的原始资料文件导入 PostgreSQL + pgvector，不再依赖 `information/RAG整理/01_BCommunity_RAG_合并全文.md` 或 JSONL 汇总文件：

- `sources`：每个原始文件一条来源记录。
- `chunks`：按原始文件切块，并保存 OpenAI embedding。
- 个人主页一对一聊天会按 `speaker_id` 过滤检索，只使用该成员自己的资料片段。
- 每个 chunk 的 metadata 会保留 `user_id`、`person_id`、`source_file`、`page`、`chunk_index` 等字段。
- 调试接口：
  - `GET /api/rag/people`：查看已导入的人和 chunk 数量。
  - `POST /api/rag/search`：直接测试向量检索。

资料目录建议保持这个形状：

```text
data/
├─ rect_repair/
│  ├─ EP19  逐字稿.md
│  ├─ 官网.md
│  ├─ 修四边形公众号/
│  │  └─ 茶水间_2_回顾.md
│  └─ _manifest.json
├─ fang_chenchu/
│  ├─ 晨初 & 假杂志检索.md
│  └─ _manifest.json
└─ luneurs/
   ├─ Luneurs_另类成长.md
   └─ _manifest.json
```

`_manifest.json` 用来标记这个文件夹属于谁；真正入库的是同目录下的原始 `.md`、`.txt`、`.pdf`、`.docx` 文件。PDF 会按页入库，所以 chunk metadata 里可以保留页码。

本地启动 pgvector：

```bash
docker compose up -d postgres
```

初始化数据库 schema：

```bash
cd backend
PYTHONPATH=. python scripts/init_db.py
```

配置 `backend/.env`，至少需要：

```bash
OPENAI_API_KEY=你的 key
OPENAI_URL=https://你的聊天模型地址/v1
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_API_KEY=你的 embedding key
OPENAI_EMBEDDING_URL=https://你的 embedding 模型地址/v1
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
DATABASE_URL=postgresql://community:community@localhost:5432/community_agents
```

导入 BCommunity 个人 RAG：

```bash
cd backend
PYTHONPATH=. python scripts/ingest_bcommunity_rag.py
```

验证导入结果：

```bash
curl http://localhost:8000/api/rag/people

curl -X POST http://localhost:8000/api/rag/search \
  -H "Content-Type: application/json" \
  -d '{"person_id":"rect_repair","query":"修四边形为什么关注城市游戏？","limit":3}'
```

然后打开前端个人主页，例如 `/member/rect_repair`，提问时会自动从 PostgreSQL + pgvector 检索该成员资料。

## PostgreSQL 记忆持久化

对话会写入 `conversations` 表：

- 普通 `/api/chat`：按 `agent_id + thread_id` 保存完整 messages。
- 首页地图单人对话：按 `roundtable-speaker:{speaker_id} + thread_id` 保存。
- 圆桌讨论：按 `roundtable + thread_id` 保存。

如果只需要对话记忆，普通数据库用户应用 `memory_schema.sql` 即可：

```bash
cd backend
python -c "from pathlib import Path; import psycopg; from app.core.settings import settings; sql=Path('app/db/memory_schema.sql').read_text(); conn=psycopg.connect(settings.database_url); conn.execute(sql); conn.commit(); conn.close()"
```

完整知识库 schema 里的 `vector` 扩展需要 PostgreSQL superuser 权限；如果要启用向量检索，再用 `postgres` 用户应用 `schema.sql`。

首页会把每位角色的 `thread_id` 存在浏览器 localStorage，刷新页面后再通过后端从 PostgreSQL 拉回消息历史。

启动后端服务：

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

健康检查：

```bash
curl http://localhost:8000/health
```

本地烟雾测试，不经过 HTTP：

```bash
cd backend
PYTHONPATH=. python scripts/smoke_chat.py
```

问答接口示例：

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"agent_id":"xiu_sibianxing","message":"修四边形为什么关注社区？","thread_id":null,"messages":[]}'
```

## 前端配置

进入前端目录并安装依赖：

```bash
cd frontend
npm install
cp .env.example .env.local
```

前端环境变量说明如下：

- `NEXT_PUBLIC_AGENT_API_URL`：后端地址，默认 `http://localhost:8000`。

启动前端开发服务：

```bash
npm run dev
```

打开 `http://localhost:3000` 即可查看页面。

## 推荐启动顺序

1. 启动后端 FastAPI 服务。
2. 启动前端 Next.js 服务。
3. 在浏览器里打开前端页面并发起测试对话。

## 常见问题

- 如果后端无法读取 `.env`，确认文件是在 `backend/.env`，并且是从 `backend` 目录启动服务。
- 如果前端请求后端失败，先检查 `NEXT_PUBLIC_AGENT_API_URL` 是否指向正确的后端地址。
- 如果你从 Windows 侧编辑文件，尽量保持 LF 换行，避免脚本在 WSL2 中出现兼容问题。
