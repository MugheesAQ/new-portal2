# Stage 1: Build the React application
FROM node:20-slim AS builder

WORKDIR /app

# Only copy package.json (NOT package-lock.json) to force a fresh resolution 
# for the Linux container architecture, bypassing the npm bug with optional native dependencies (@tailwindcss/oxide).
COPY package.json ./

# Install dependencies freshly for the Linux container
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite React application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for normal HTTP traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
