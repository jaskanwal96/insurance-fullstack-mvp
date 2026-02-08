# Railway Deployment - Quick Start

Your apps are now ready to deploy to Railway! 🚀

## What's Been Configured

✅ **Backend (Spring Boot)**
- Docker configuration ready
- Environment variables for Railway MS SQL Server
- Dynamic port configuration

✅ **Frontend (React + Vite)**
- Docker configuration with nginx
- Production environment template
- API proxy ready

## Quick Deploy Steps

1. **Sign up at [railway.app](https://railway.app)**

2. **Create new project** → Add MS SQL Server database

3. **Deploy backend:**
   - Connect GitHub repo or use Railway CLI
   - Set root directory: `server`
   - Configure env vars (see guide)

4. **Deploy frontend:**
   - Connect same repo or use CLI
   - Set root directory: `client`
   - Add backend URL to env vars

5. **Generate public domains** for both services

6. **Test your app!**

## 📖 Full Documentation

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete step-by-step instructions.

## Files Modified/Created

### Backend
- `server/railway.toml` - Railway config
- `server/src/main/resources/application.properties` - Env var support

### Frontend
- `client/railway.toml` - Railway config
- `client/.env.production` - Production env template

## Need Help?

Check the troubleshooting section in [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
