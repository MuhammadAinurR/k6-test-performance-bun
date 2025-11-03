# Bun Backend + Docker + k6

## Build & run (dev / server)

1. Build and start the app:
   ```bash
   docker-compose up --build -d app


# Power shell rps check scirpt
docker run --rm -it `
  -v "C:\Users\itsro\Documents\dev\me\k6-test-performance-bun\scripts:/scripts" `
  -e VUS=50 `
  -e DURATION=30s `
  -e TARGET=http://host.docker.internal:3000 `
  grafana/k6:latest run /scripts/k6-test.js


# Ubuntu rps check script
docker compose run --rm \
  -e VUS=50 \
  -e DURATION=30s \
  -e TARGET=http://app:3000 \
  k6 run /scripts/k6-test.js
