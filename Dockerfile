# Dependencies stage
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Initialize the database first
RUN node initDB.js

# Build the application
RUN npm run build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/meals.db ./meals.db

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Render provides PORT environment variable
EXPOSE ${PORT:-3000}

ENV PORT=${PORT:-3000}
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]