# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Create uploads directory
RUN mkdir -p uploads

# Expose port 3000
EXPOSE 3000

CMD ["npm", "run", "start:prod"] 