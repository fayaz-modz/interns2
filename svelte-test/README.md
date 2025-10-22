# Svelte + Bun + Docker

## 🚀 Setup & Run

### 1. Build Docker image

```bash
docker build -t test-bun-app .
```

### 2. Run container

```bash
docker run -p 5173:5173 test-bun-app
```

### 3. Access app

Open: [http://localhost:5173](http://localhost:5173)

---

## 🧰 Development Notes

- App runs using `bun run dev --host 0.0.0.0`
- Port `5173` is exposed to host
- Uses `oven/bun:latest` as base image
- Install dependencies via `bun install --frozen-lockfile`

---

## 🧹 Useful Commands

Stop all running containers:

```bash
docker stop $(docker ps -q)
```

Remove all stopped containers:

```bash
docker container prune -f
```

Rebuild without cache:

```bash
docker build --no-cache -t test-bun-app .
```
