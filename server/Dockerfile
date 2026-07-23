FROM node:20-bookworm-slim

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source files
COPY . .

# Expose default API port
EXPOSE 3001

# Environment variables defaults
ENV PORT=3001 \
    NODE_ENV=production

CMD ["npm", "start"]
