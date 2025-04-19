FROM alpine:latest AS base

# Install Node.js and Yarn
RUN apk add --no-cache nodejs yarn

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json and yarn.lock
COPY dashboard/package.json dashboard/yarn.lock* ./
RUN yarn install --frozen-lockfile

# Development image with hot reload support
FROM base AS development
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY dashboard/public ./public
COPY dashboard/src ./src
COPY dashboard/package.json ./package.json
COPY dashboard/yarn.lock* ./yarn.lock
COPY dashboard/next.config.ts ./next.config.ts
COPY dashboard/tsconfig.json ./tsconfig.json
COPY dashboard/next-env.d.ts ./next-env.d.ts
COPY dashboard/eslint.config.mjs ./eslint.config.mjs

# Expose default Next.js port
EXPOSE 3000

# Run development server with turbopack (hot reload)
CMD ["yarn", "dev"]

# Production build (not used for development but included for completeness)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY dashboard/ ./
RUN yarn build

# Production image
FROM base AS production
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"] 