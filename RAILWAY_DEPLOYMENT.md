# Railway Deployment Guide

This guide walks you through deploying both the frontend (React) and backend (Spring Boot) applications to Railway using Docker.

## Prerequisites

- Railway account (sign up at [railway.app](https://railway.app))
- GitHub repository (optional but recommended)
- Both apps are already Docker-ready ✅

## Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Frontend       │         │  Backend        │         │  MS SQL Server  │
│  (React+nginx)  │────────▶│  (Spring Boot)  │────────▶│  Database       │
│  Port: 80       │   API   │  Port: 8080     │  JDBC   │  (Railway)      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Step-by-Step Deployment

### 1. Create a New Railway Project

1. Go to [railway.app](https://railway.app) and log in
2. Click **"New Project"**
3. Choose **"Empty Project"**
4. Give your project a name (e.g., "Insurance Portal")

### 2. Add MS SQL Server Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add MSSQL"**
3. Railway will provision a MS SQL Server instance
4. Note: Railway will automatically create these environment variables:
   - `MSSQL_URL` (full connection string)
   - `MSSQL_HOST`
   - `MSSQL_PORT`
   - `MSSQL_USER`
   - `MSSQL_PASSWORD`
   - `MSSQL_DATABASE`

### 3. Deploy Backend Service

#### Option A: Deploy from GitHub (Recommended)

1. Push your code to GitHub if not already done
2. In Railway project, click **"+ New"** → **"GitHub Repo"**
3. Select your repository
4. Railway will detect the `server` folder
5. Set **Root Directory** to `server`
6. Railway will automatically detect the Dockerfile

#### Option B: Deploy from Local (Using Railway CLI)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Deploy backend
cd server
railway up
```

#### Configure Backend Environment Variables

1. Click on your backend service in Railway
2. Go to **"Variables"** tab
3. Add the following variables:

```bash
# Database Configuration
DATABASE_URL=jdbc:sqlserver://${MSSQL_HOST}:${MSSQL_PORT};database=${MSSQL_DATABASE};encrypt=true;trustServerCertificate=true;loginTimeout=30;
DATABASE_USERNAME=${MSSQL_USER}
DATABASE_PASSWORD=${MSSQL_PASSWORD}

# Port (Railway auto-assigns)
PORT=${{RAILWAY_PUBLIC_PORT}}
```

4. Click **"Deploy"** to restart with new variables

### 4. Deploy Frontend Service

#### Option A: Deploy from GitHub

1. In Railway project, click **"+ New"** → **"GitHub Repo"**
2. Select the same repository
3. Set **Root Directory** to `client`
4. Railway will detect the Dockerfile

#### Option B: Deploy from Local

```bash
cd client
railway up
```

#### Configure Frontend Environment Variables

1. Click on your frontend service
2. Go to **"Variables"** tab
3. Add:

```bash
# Backend API URL (use your backend's Railway URL)
VITE_API_URL=https://your-backend-service.up.railway.app
```

**Important:** Replace `your-backend-service` with your actual backend service name from Railway.

To find your backend URL:
- Click on your backend service
- Go to **"Settings"** → **"Networking"**
- Copy the **"Public Domain"**

### 5. Generate Public Domains

Both services need public URLs:

1. **Backend Service:**
   - Click on backend service → **"Settings"** → **"Networking"**
   - Click **"Generate Domain"**
   - Copy this URL for the frontend's `VITE_API_URL`

2. **Frontend Service:**
   - Click on frontend service → **"Settings"** → **"Networking"**
   - Click **"Generate Domain"**
   - This is your public application URL

### 6. Update Frontend with Backend URL

After generating the backend domain:

1. Go to frontend service → **"Variables"**
2. Update `VITE_API_URL` with the actual backend URL
3. Redeploy the frontend (it will rebuild with the new env var)

## Environment Variables Reference

### Backend (`server`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | JDBC connection string | `jdbc:sqlserver://...` |
| `DATABASE_USERNAME` | Database username | From Railway MSSQL plugin |
| `DATABASE_PASSWORD` | Database password | From Railway MSSQL plugin |
| `PORT` | Server port | `8080` (auto-set by Railway) |

### Frontend (`client`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://backend.up.railway.app` |

## Verification Steps

### 1. Check Backend Health

```bash
# Test backend is running
curl https://your-backend.up.railway.app/actuator/health

# Test login endpoint
curl -X POST https://your-backend.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

### 2. Check Frontend

1. Visit your frontend URL: `https://your-frontend.up.railway.app`
2. You should see the login page
3. Open browser DevTools → Network tab
4. Try logging in and verify API calls go to the backend

### 3. Check Database Connection

1. In Railway, click on your backend service
2. Go to **"Deployments"** → Click latest deployment
3. View **"Logs"**
4. Look for successful database connection messages:
   ```
   HikariPool-1 - Start completed.
   Started Team8BackendApplication
   ```

## Troubleshooting

### Backend won't start

**Check logs:**
1. Railway → Backend Service → Deployments → View Logs

**Common issues:**
- Database connection timeout → Check `DATABASE_URL` format
- Port binding error → Ensure `server.port=${PORT:8080}` in `application.properties`

### Frontend can't reach backend

**Check:**
1. `VITE_API_URL` is set correctly in frontend variables
2. Backend has a public domain generated
3. CORS is configured in backend (check `SecurityConfig.java`)

### Database connection failed

**Verify:**
1. MS SQL Server plugin is running (green status in Railway)
2. Environment variables are correctly mapped
3. Connection string format is correct for SQL Server

### Build failures

**Frontend:**
```bash
# Check if build works locally
cd client
npm install
npm run build
```

**Backend:**
```bash
# Check if build works locally
cd server
./mvnw clean package -DskipTests
```

## Monitoring & Logs

### View Logs
1. Railway → Click service → **"Deployments"**
2. Click on latest deployment
3. View real-time logs

### Metrics
1. Railway → Click service → **"Metrics"**
2. View CPU, Memory, Network usage

## Cost Optimization

Railway offers:
- **Free Tier:** $5 credit/month (good for testing)
- **Pro Plan:** $20/month + usage

**Tips:**
- Use sleep mode for non-production environments
- Monitor resource usage in Metrics tab
- Scale down during off-hours if needed

## Next Steps

1. ✅ Deploy both services
2. ✅ Configure environment variables
3. ✅ Generate public domains
4. ✅ Test the application
5. 🔄 Set up custom domain (optional)
6. 🔄 Configure CI/CD with GitHub (auto-deploy on push)
7. 🔄 Set up monitoring and alerts

## Custom Domain (Optional)

To use your own domain:

1. Railway → Service → **"Settings"** → **"Networking"**
2. Click **"Custom Domain"**
3. Add your domain (e.g., `app.yourdomain.com`)
4. Update your DNS with the provided CNAME record

## CI/CD Setup

Railway automatically deploys when you push to GitHub:

1. Connect your GitHub repository (already done if using Option A)
2. Every push to `main` branch triggers automatic deployment
3. View deployment status in Railway dashboard

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: Create issues in your repository

---

**Deployment Checklist:**

- [ ] Create Railway project
- [ ] Add MS SQL Server database
- [ ] Deploy backend service
- [ ] Configure backend environment variables
- [ ] Generate backend public domain
- [ ] Deploy frontend service
- [ ] Configure frontend environment variables (with backend URL)
- [ ] Generate frontend public domain
- [ ] Test login functionality
- [ ] Verify database connectivity
- [ ] Check application logs
- [ ] (Optional) Set up custom domain
- [ ] (Optional) Configure monitoring
