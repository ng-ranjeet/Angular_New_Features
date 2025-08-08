# Stage 1: Build Angular app
FROM node:20 AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build Angular app
COPY . .
RUN npm run build --prod

# Stage 2: Serve Angular app with NGINX
FROM nginx:stable-alpine

# Remove default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from builder stage to NGINX's public directory
COPY --from=builder /app/dist/your-app-name /usr/share/nginx/html

# Copy custom NGINX config (optional but recommended for SPA support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
