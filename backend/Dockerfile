FROM node:16.15-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start"]