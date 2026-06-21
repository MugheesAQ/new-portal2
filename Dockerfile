# Stage 1: Build the React application
FROM node:20-slim AS builder

WORKDIR /app

# Copy the package files
COPY package*.json ./

# Install dependencies with optional bindings (works around npm bug #4828)
# We remove package-lock.json if copied from host to prevent cross-platform OS optional dependency mismatch
RUN rm -f package-lock.json && npm install

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
