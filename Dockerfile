# =========================================================================
# MULTI-STAGE DOCKERFILE FOR AURALENS (GOOGLE CLOUD RUN & GOOGLE AI STUDIO)
# =========================================================================

# Stage 1: Build Client Frontend
FROM node:22-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Build Server Backend
FROM node:22-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json tsconfig.json ./
RUN npm ci
COPY server/src ./src
RUN npm run build
RUN npm prune --production

# Stage 3: Minimal Production Runtime (< 120MB)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy Server build & dependencies
COPY server/package*.json ./server/
COPY --from=server-builder /app/server/node_modules ./server/node_modules
COPY --from=server-builder /app/server/dist ./server/dist

# Copy Client production static bundle
COPY --from=client-builder /app/client/dist ./client/dist

WORKDIR /app/server

EXPOSE 8080

USER node

CMD ["node", "dist/app.js"]
