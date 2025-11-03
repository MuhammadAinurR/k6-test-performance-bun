# Dockerfile
FROM debian:bookworm-slim as builder

# Install dependencies required for fetching and installing Bun
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Install Bun via official install script
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# (Optional) install dependencies if package.json exists
RUN if [ -f package.json ]; then bun install; fi

# --- Runtime stage ---
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates unzip && rm -rf /var/lib/apt/lists/*

# Copy Bun from builder
COPY --from=builder /root/.bun /root/.bun
ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# Copy application code
WORKDIR /app
COPY --from=builder /app /app

# Expose port
EXPOSE 3000

# Default environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the Bun server
CMD ["bun", "run", "src/index.ts"]
