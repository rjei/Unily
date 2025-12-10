# 🚀 Unily - Deployment Guide

## Docker Deployment

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB+ RAM available
- Midtrans account (for payment integration)

---

## 📦 Quick Start

### 1. Clone & Configure

```bash
cd "C:\Users\lenovo\OneDrive\Documents\USU\Sem3-Pemrograman Web\Unily"
```

### 2. Setup Environment Variables

**Backend Configuration:**

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```bash
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://superadmin:passwordAdmin123@db:5432/unily_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
MIDTRANS_SERVER_KEY=YOUR_MIDTRANS_SERVER_KEY_HERE
MIDTRANS_CLIENT_KEY=YOUR_MIDTRANS_CLIENT_KEY_HERE
MIDTRANS_IS_PRODUCTION=false
```

**Frontend Configuration:**

```bash
cd ..
cp .env.example .env
```

Edit `.env`:

```bash
VITE_API_URL=http://localhost:4000/api
VITE_MIDTRANS_CLIENT_KEY=YOUR_MIDTRANS_CLIENT_KEY_HERE
```

### 3. Build & Run

```bash
docker-compose build
docker-compose up -d
```

### 4. Verify Services

```bash
# Check all containers are running
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 5. Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000/api
- **Database:** localhost:5432
- **pgAdmin:** http://localhost:5050

---

## 🔧 Configuration

### Docker Compose Services

| Service    | Port | Description                   |
| ---------- | ---- | ----------------------------- |
| `frontend` | 5173 | Vite React development server |
| `backend`  | 4000 | Express.js API server         |
| `db`       | 5432 | PostgreSQL 16 database        |
| `pgadmin`  | 5050 | Database management UI        |

### Environment Variables

#### Backend Required:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens (min 32 chars)
- `MIDTRANS_SERVER_KEY`: From Midtrans dashboard
- `MIDTRANS_CLIENT_KEY`: From Midtrans dashboard

#### Frontend Required:

- `VITE_API_URL`: Backend API URL
- `VITE_MIDTRANS_CLIENT_KEY`: Midtrans client key

---

## 🛠️ Development Workflow

### Start Services

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### Restart Service

```bash
docker-compose restart backend
docker-compose restart frontend
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Rebuild After Code Changes

```bash
# Rebuild specific service
docker-compose build backend
docker-compose up -d backend

# Rebuild all services
docker-compose build
docker-compose up -d
```

### Database Operations

**Connect to PostgreSQL:**

```bash
docker-compose exec db psql -U superadmin -d unily_db
```

**Run SQL Script:**

```bash
docker-compose exec -T db psql -U superadmin -d unily_db < init-scripts/01-unily-schema.sql
```

**Backup Database:**

```bash
docker-compose exec db pg_dump -U superadmin unily_db > backup.sql
```

**Restore Database:**

```bash
docker-compose exec -T db psql -U superadmin -d unily_db < backup.sql
```

---

## 🔍 Troubleshooting

### Container Won't Start

**Check logs:**

```bash
docker-compose logs backend
```

**Common issues:**

- Port already in use (change port in compose.yaml)
- Environment variables missing
- Database not ready (wait for health check)

### Database Connection Failed

**Verify database is running:**

```bash
docker-compose ps db
```

**Check database health:**

```bash
docker-compose exec db pg_isready -U superadmin
```

**Restart database:**

```bash
docker-compose restart db
```

### Frontend Can't Connect to Backend

**Check CORS configuration in backend:**

```javascript
// server/src/app.js
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
```

**Verify API URL in frontend:**

```bash
# Check .env file
cat .env | grep VITE_API_URL
```

### Permission Denied on Windows

**Run Docker commands as Administrator or:**

```bash
# Add user to docker-users group
net localgroup docker-users "your-username" /add
```

### Clean Start (Nuclear Option)

```bash
# Stop and remove all containers, volumes, networks
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild everything
docker-compose build --no-cache
docker-compose up -d
```

---

## 📊 Monitoring

### Health Checks

**Backend Health:**

```bash
curl http://localhost:4000/api/health
```

**Database Health:**

```bash
docker-compose exec db pg_isready -U superadmin
```

### Resource Usage

```bash
docker stats
```

### Container Inspection

```bash
docker-compose exec backend sh
docker-compose exec frontend sh
```

---

## 🚀 Production Deployment

### 1. Update Environment Variables

**Set production values:**

```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-host:5432/unily_db
JWT_SECRET=use_a_very_strong_random_secret_here
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_SERVER_KEY=your_production_server_key
CLIENT_ORIGIN=https://yourdomain.com
```

### 2. Build Production Images

**Backend (production build):**

```dockerfile
# Add to server/Dockerfile for production
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 4000
CMD ["npm", "start"]
```

**Frontend (static build):**

```dockerfile
# Update Dockerfile.frontend for production
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Use Docker Swarm or Kubernetes

**Docker Swarm:**

```bash
docker swarm init
docker stack deploy -c compose.yaml unily
```

**Kubernetes:**

```bash
# Convert compose to k8s manifests
kompose convert -f compose.yaml
kubectl apply -f .
```

---

## 🔐 Security Checklist

- [ ] Change default database passwords
- [ ] Use strong JWT secret (min 32 characters)
- [ ] Enable HTTPS in production
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable database SSL connections
- [ ] Use environment-specific .env files
- [ ] Never commit .env files to Git
- [ ] Use secrets management (Docker secrets, Vault)
- [ ] Enable container security scanning

---

## 📝 Maintenance

### Update Dependencies

**Backend:**

```bash
docker-compose exec backend npm outdated
docker-compose exec backend npm update
```

**Frontend:**

```bash
docker-compose exec frontend npm outdated
docker-compose exec frontend npm update
```

### Backup Strategy

**Daily Database Backup:**

```bash
# Add to cron job
docker-compose exec db pg_dump -U superadmin unily_db | gzip > backup_$(date +%Y%m%d).sql.gz
```

**Weekly Full Backup:**

```bash
# Backup volumes
docker run --rm --volumes-from unily_db_1 -v $(pwd):/backup alpine tar czf /backup/db_volume_backup.tar.gz /var/lib/postgresql/data
```

---

## 🆘 Support

**Check logs first:**

```bash
docker-compose logs -f --tail=100
```

**Common Commands:**

```bash
# Restart everything
docker-compose restart

# Check service health
docker-compose ps

# Clean Docker system
docker system prune -a --volumes

# View network
docker network ls
docker network inspect unily_app-network
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Midtrans Documentation](https://docs.midtrans.com/)

---

**Last Updated:** 2024
**Version:** 1.0.0
