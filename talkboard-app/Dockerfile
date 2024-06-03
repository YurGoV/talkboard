FROM node:20

WORKDIR /app

COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm fetch

COPY . .

EXPOSE 4141

CMD ["pnpm", "run", "start:dev"]

