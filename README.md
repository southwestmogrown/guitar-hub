# Guitar Hub

A platform for musicians to upload, collaborate, and split audio into individual stems using AI.

## Tech Stack

- **Frontend**: React 17 / Redux (port 3000)
- **Backend**: Node.js / Express / Sequelize 5 / PostgreSQL (port 8080)
- **Python service**: FastAPI / Demucs (port 8001)

---

## Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 14+ (this project uses port 5433 — adjust `.env` if yours differs)

---

## Setup

### 1. Clone and install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Python service
cd ../python-service
pip install -r requirements.txt
```

### 2. Configure environment variables

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

### 3. Create the database and user

```bash
sudo -u postgres psql -c "CREATE USER guitar_hub_app WITH PASSWORD 'password';"
sudo -u postgres psql -c "CREATE DATABASE guitar_hub OWNER guitar_hub_app;"
```

> If PostgreSQL is on a non-default port, add `-p 5433` to the commands above.

### 4. Run migrations and seed data

```bash
cd backend
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

---

## Running in Development

Each service runs in its own terminal.

**Terminal 1 — Backend (port 8080)**

```bash
cd backend
npm start
```

**Terminal 2 — Frontend (port 3000)**

```bash
cd frontend
npm start
```

**Terminal 3 — Python stem service (port 8001)**

```bash
cd python-service
uvicorn main:app --host 0.0.0.0 --port 8001
```

The app is available at `http://localhost:3000`.

A demo account is seeded and accessible via the **Demo** button on the landing page.

---

## Features

- Upload audio mixes and preview them in the browser
- AI-powered stem separation (vocals, drums, bass, guitar, piano, other) via [Demucs](https://github.com/facebookresearch/demucs)
- Publish individual stems as public tracks
- Edit and delete owned tracks and mixes
- User authentication with CSRF protection
