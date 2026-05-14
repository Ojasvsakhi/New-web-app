# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

ARG VITE_FORMSPREE_FORM_ID
ENV VITE_FORMSPREE_FORM_ID=$VITE_FORMSPREE_FORM_ID
COPY package.json package-lock.json ./
COPY apps/package.json apps/
COPY apps/vite.config.js apps/
COPY apps/.env.local apps/
COPY apps/ apps/

RUN npm install
RUN npm run build --workspace=apps

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/apps/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
