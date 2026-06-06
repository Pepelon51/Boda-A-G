FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install  # npm ci también requiere lockfile, así que fallback a install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]