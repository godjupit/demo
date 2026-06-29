# Community Agent Prototype

这是一个面向社区知识问答与圆桌讨论的原型项目。当前版本已经打通前后端和本地文件数据源，适合在 WSL2 中直接跑通并继续迭代。

## 项目内容

项目分成三层：

- 前端：基于 Next.js 的交互界面，负责对话、圆桌和结果展示。
- 后端：基于 Python、FastAPI 和 LangGraph 的 Agent 服务，负责接收请求、检索上下文和生成回答。
- 数据层：当前以本地 Markdown 和 Agent Profile 为主。

当前仓库里已经包含这些入口：

- `/api/chat`：单轮问答接口。
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

- `OPENAI_API_KEY`：OpenAI 或兼容模型的 API Key。
- `OPENAI_URL`：可选，自定义模型服务地址。
- `OPENAI_CHAT_MODEL`：默认聊天模型名，当前示例为 `gpt-4o-mini`。
- `FRONTEND_ORIGIN`：前端访问源，用于 CORS 配置。

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
