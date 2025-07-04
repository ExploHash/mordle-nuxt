# --- Stage 1: Build ---
FROM node:16 as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app files
COPY . .

# Build the Nuxt app
RUN npm run build


# --- Stage 2: Runtime ---
FROM node:16-slim as runner

WORKDIR /app

# Copy ONLY the build output from builder
COPY --from=builder /app/.output ./

# Optional but safer: re-install only production deps (if needed)
# COPY --from=builder /app/package*.json ./
# RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "server/index.mjs"]
