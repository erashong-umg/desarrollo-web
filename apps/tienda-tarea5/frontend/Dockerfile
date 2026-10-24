# Etapa 1: build de la SPA con Vite
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# Variables inyectadas en tiempo de build (Vite las "hornea" dentro del bundle).
ARG VITE_API_URL=http://localhost:4000/api
ARG VITE_APP_VERSION=1.0.0
ARG VITE_APP_COLOR=blue
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}
ENV VITE_APP_COLOR=${VITE_APP_COLOR}

RUN npm run build

# Etapa 2: servir los archivos estáticos con Nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
