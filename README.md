# 🎸 Guitar Hub

> *Ever wanted just the drums from a song? Or the bass, isolated, clean, ready to learn from? Guitar Hub does that.*

Guitar Hub is a platform for musicians to upload audio mixes and use AI to separate them into individual stems — vocals, drums, bass, guitar, piano, and more. Each stem can be previewed in the browser, published as its own track, and shared with other musicians.

Built on [Demucs](https://github.com/facebookresearch/demucs), the source separation model developed by Facebook Research. The same technology used in professional audio workflows — running locally, under your control.

---

## 🎧 What You Can Do

- **Upload** any audio mix and preview it directly in the browser
- **Separate** it into up to 6 individual stems using AI:
  - 🎤 Vocals
  - 🥁 Drums
  - 🎸 Guitar
  - 🎹 Piano
  - 🎵 Bass
  - 🎶 Other
- **Publish** individual stems as public tracks to share with other musicians
- **Collaborate** — browse and build on stems others have published
- **Manage** your library — edit and delete your own tracks and mixes

---

## 🛠️ How It Works

Three services work together under the hood:

```
Browser (React)
    ↓ upload audio
Node.js Backend
    ↓ forwards to
Python Service (FastAPI + Demucs)
    ↓ returns
Individual stem files
    ↓ stored and served back to
Browser (preview + publish)
```

**Demucs** does the heavy lifting. It's a deep learning model trained on thousands of songs to recognize and isolate individual instruments. It runs locally in the Python service — no audio is sent to a third-party API.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 17 + Redux |
| Backend | Node.js + Express + Sequelize + PostgreSQL |
| AI Service | Python + FastAPI + Demucs |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 14+

> This project uses PostgreSQL on port **5433** by default. Adjust `.env` if yours is on the standard 5432.

### 1. Clone and Install

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Python service
cd ../python-service && pip install -r requirements.txt
```

### 2. Configure Environment

Create `backend/.env`:

```env
PORT=8080
DB_USERNAME=guitar_hub_app
DB_PASSWORD=password
DB_DATABASE=guitar_hub
DB_HOST=localhost
DB_PORT=5433
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=604800
PYTHON_SERVICE_URL=http://127.0.0.1:8001
NODE_BASE_URL=http://127.0.0.1:8080
```

### 3. Create the Database

```bash
sudo -u postgres psql -c "CREATE USER guitar_hub_app WITH PASSWORD 'password';"
sudo -u postgres psql -c "CREATE DATABASE guitar_hub OWNER guitar_hub_app;"
```

> On a non-default port, add `-p 5433` to the commands above.

### 4. Migrate and Seed

```bash
cd backend
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

---

## 🖥️ Running Locally

Each service runs in its own terminal.

```bash
# Terminal 1 — Backend (port 8080)
cd backend && npm start

# Terminal 2 — Frontend (port 3000)
cd frontend && npm start

# Terminal 3 — AI stem service (port 8001)
cd python-service && uvicorn main:app --host 0.0.0.0 --port 8001
```

Open [http://localhost:3000](http://localhost:3000).

A demo account is seeded automatically — hit the **Demo** button on the landing page to try it without signing up.

---

## 🔒 Auth and Security

- JWT-based authentication
- CSRF protection on all state-modifying routes
- Users can only edit and delete their own content

---

## 💡 About Demucs

Demucs is an open-source audio source separation model from Facebook Research. It uses a hybrid transformer architecture trained on a large dataset of mixed and isolated tracks. The results are significantly cleaner than older FFT-based approaches — particularly for vocals and drums.

[Learn more about Demucs →](https://github.com/facebookresearch/demucs)
