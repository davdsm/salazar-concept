# Base image
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache g++ make py3-pip libc6-compat
EXPOSE 3000

# Builder stage
FROM base AS builder
WORKDIR /app
COPY . .

# Install all dependencies (including devDependencies) for build
RUN npm install 
RUN npm run build

# Production stage (only keeps production dependencies)
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
CMD ["npm", "start"]
