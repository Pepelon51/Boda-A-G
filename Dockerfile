FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies)
RUN npm install

# Copiar el resto del código
COPY . .

# TypeScript y Vite estarán disponibles porque se instalaron
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]