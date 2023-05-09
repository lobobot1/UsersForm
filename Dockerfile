FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.


ENV NEXT_TELEMETRY_DISABLED 1
ARG ANSWERED_STATUS=1
ARG CREATED_STATUS=2
ARG DATABASE_URL
ARG HOSTNAME
ARG REVISED_STATUS=5
ARG SECRET
ARG UPDATED_STATUS=6
ENV ANSWERED_STATUS=${ANSWERED_STATUS}
ENV CREATED_STATUS=${CREATED_STATUS}
ENV DATABASE_URL=${DATABASE_URL}
ENV HOSTNAME=${HOSTNAME}
ENV REVISED_STATUS=${REVISED_STATUS}
ENV SECRET=${SECRET}
ENV UPDATED_STATUS=${UPDATED_STATUS}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn prisma generate

# Check if exist database, generate migrate or generate new database with seeder

RUN \
  if [ -f ./db/prod.db ]; then yarn prisma migrate deploy; \
  else touch ./db/prod.db && yarn prisma db push && yarn prisma db seed; \
  fi

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1
ARG ANSWERED_STATUS=1
ARG CREATED_STATUS=2
ARG DATABASE_URL
ARG HOSTNAME
ARG BASE_URL
ARG REVISED_STATUS=5
ARG SECRET
ARG UPDATED_STATUS=6
ENV HOSTNAME=${HOSTNAME}
ENV BASE_URL=${BASE_URL}
ENV ANSWERED_STATUS=${ANSWERED_STATUS}
ENV CREATED_STATUS=${CREATED_STATUS}
ENV DATABASE_URL=${DATABASE_URL}
ENV REVISED_STATUS=${REVISED_STATUS}
ENV SECRET=${SECRET}
ENV UPDATED_STATUS=${UPDATED_STATUS}
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/db ./db

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]