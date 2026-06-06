# Etapa 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Limpiar posibles archivos bloqueados
RUN rm -rf node_modules .vite dist

COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Si usas npm
RUN npm cache clean --force
RUN npm ci

# O si usas pnpm (recomendado)
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

COPY . .

# Limpiar .vite nuevamente antes del build
RUN rm -rf .vite

RUN npm run build