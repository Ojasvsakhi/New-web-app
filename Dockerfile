# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/
COPY apps/web/vite.config.js apps/web/
COPY apps/web/.env.local apps/web/
COPY apps/web/ apps/web/

RUN npm install
RUN npm run build --workspace=apps/web

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/apps/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
