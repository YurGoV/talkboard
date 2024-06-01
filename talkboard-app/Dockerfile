# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm fetch

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Stage 2: Run
FROM node:20

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]

