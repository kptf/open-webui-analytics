FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173 3001
CMD sh -lc "node server.js & npx --no-install vite --host 0.0.0.0 --port 5173 --strictPort"