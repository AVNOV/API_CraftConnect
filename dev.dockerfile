FROM node:19-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build
