# ⚠️ WARNING: This is NOT recommended for Railway deployment
# This Dockerfile builds both apps but can only run ONE at a time
# Use this only if you understand the limitations

# ============================================
# Stage 1: Build Frontend
# ============================================
FROM node:18-alpine AS frontend-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# ============================================
# Stage 2: Build Backend
# ============================================
FROM maven:3.9.4-eclipse-temurin-21 AS backend-builder

WORKDIR /app/server

COPY server/pom.xml ./
COPY server/src ./src

RUN mvn -B -DskipTests package

# ============================================
# Stage 3: Runtime - Frontend with Nginx
# ============================================
FROM nginx:alpine AS frontend-runtime

COPY --from=frontend-builder /app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ============================================
# Stage 4: Runtime - Backend with JRE
# ============================================
FROM eclipse-temurin:21-jre-jammy AS backend-runtime

WORKDIR /app

COPY --from=backend-builder /app/server/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# ============================================
# Default: You must specify --target flag
# ============================================
# To build frontend: docker build --target frontend-runtime -t frontend .
# To build backend:  docker build --target backend-runtime -t backend .
