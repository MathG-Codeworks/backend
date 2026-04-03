FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma /prisma

RUN npm cache clean --force
RUN npm ci --ignore-scripts --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build


FROM node:22-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY prisma.config.ts .

EXPOSE 3000
CMD ["npm", "run", "start:migrate:prod"]