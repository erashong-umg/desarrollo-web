FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV PORT=4000
EXPOSE 4000

ARG APP_VERSION=1.0.0
ARG APP_COLOR=blue
ENV APP_VERSION=${APP_VERSION}
ENV APP_COLOR=${APP_COLOR}

CMD ["node", "src/server.js"]
