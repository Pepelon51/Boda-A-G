# Etapa 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar la aplicación
RUN npm run build

# Verificar que dist se creó correctamente
RUN ls -la dist/

# Etapa 2: Servidor (usando el mismo método que funciona localmente)
FROM node:24-alpine

WORKDIR /app

# Instalar http-server globalmente
RUN npm install -g http-server

# Copiar los archivos compilados desde la etapa builder
COPY --from=builder /app/dist ./dist

# Verificar que los archivos están ahí
RUN ls -la dist/

# Exponer el puerto que Railway asignará
EXPOSE 8080

# Iniciar el servidor (mismo comando que usaste localmente)
CMD ["http-server", "dist", "-p", "8080", "--host", "0.0.0.0"]