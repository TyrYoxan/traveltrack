# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Essayer npm ci d'abord (plus strict), fallback sur npm install
RUN npm ci || npm install --omit=dev

COPY . .

# Génère le client Prisma
RUN npx prisma generate

# Production stage
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Installer dumb-init pour gérer les signaux correctement
RUN apk add --no-cache dumb-init

COPY package*.json ./

# Essayer npm ci d'abord, fallback sur npm install
RUN npm ci --omit=dev || npm install --omit=dev

# Copier Prisma (pour les migrations et client)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

COPY . .

# Non-root user pour sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.js"]