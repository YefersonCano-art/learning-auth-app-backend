# Stage 1 - Production dependencies
FROM oven/bun:1 AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Stage 2 - Build
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# Stage final - Production
FROM oven/bun:1

WORKDIR /app

# Copiamos node_modules de producción y dist compilado
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Comando de producción
CMD ["bun", "dist/index.js"]