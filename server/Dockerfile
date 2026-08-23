# ==========================================
# MULTI-STAGE DOCKERFILE FOR GOOGLE CLOUD RUN
# ==========================================

# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source code and compile TypeScript
COPY src ./src
RUN npm run build

# Prune dev dependencies for minimal production size
RUN npm prune --production

# ==========================================
# Stage 2: Minimal Production Runtime (< 90MB)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy only production dependencies and compiled JavaScript
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Cloud Run listens on PORT environment variable
EXPOSE 8080

USER node

CMD ["node", "dist/app.js"]
