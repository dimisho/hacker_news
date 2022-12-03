FROM node:16.15-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build
FROM node:16.15-alpine
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/.env ./build
RUN npm ci --production
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]