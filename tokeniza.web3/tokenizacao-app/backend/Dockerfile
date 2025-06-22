# Build stage
FROM rust:1.75-bookworm AS builder

WORKDIR /app

# Create non-root user for build
RUN groupadd -r rustuser && useradd -r -g rustuser rustuser

# Copy dependency files first for better caching
COPY Cargo.toml ./
COPY src ./src

# Build the application
RUN cargo build --release

# Runtime stage - Use distroless for better security
FROM gcr.io/distroless/cc-debian12:latest

# Copy the binary from builder stage
COPY --from=builder /app/target/release/tokenizacao-backend /usr/local/bin/tokenizacao-backend

# Expose port
EXPOSE 8080

# Set the binary as the entrypoint
ENTRYPOINT ["/usr/local/bin/tokenizacao-backend"]