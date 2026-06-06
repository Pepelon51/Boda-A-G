# Etapa 1: Builder
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servidor NGINX
FROM nginx:alpine

# Copiar los archivos compilados
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar NGINX para usar el puerto de Railway
RUN echo 'server { \
    listen 0.0.0.0:${PORT:-8080}; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer el puerto (Railway usará $PORT)
EXPOSE ${PORT:-8080}

# Iniciar NGINX reemplazando la variable PORT
CMD sh -c "envsubst '\${PORT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"