FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .

ENV PORT=3000
EXPOSE 3000

# Build args para distinguir versiones de imagen (ej. v1 "blue" / v2 "green")
ARG APP_VERSION=1.0.0
ARG APP_COLOR=blue
ENV APP_VERSION=${APP_VERSION}
ENV APP_COLOR=${APP_COLOR}

CMD ["node", "server.js"]
