# =====================
# 1. Dependencies stage
# =====================
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files only
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --verbose --ignore-scripts --no-audit --no-fund

# =====================
# 2. Builder stage
# =====================
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Build the application
RUN npm run build

# =====================
# 3. Runner stage (Production)
# =====================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

# Copy build application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static /.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
