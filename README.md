# Hotel Offer Orchestrator

Aggregates hotel offers from two mock suppliers, dedupes by hotel name (keeping the
cheaper price when both suppliers list the same hotel), caches the result in Redis,
and supports price-range filtering.

## Stack

Node.js (TypeScript), Express, Temporal, Redis, Docker Compose.

## Setup

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker Compose) and [Node.js](https://nodejs.org).
2. Clone this repo and open a terminal in its root folder.
3. `npm install`

## Deployment

```bash
docker compose up --build -d
```

This starts all required services: Postgres (Temporal's datastore), Temporal server,
Temporal UI, Redis, the API (`app`), and the `worker`.

- API: http://localhost:3000
- Temporal UI: http://localhost:8080

Verify it's running:

```bash
curl "http://localhost:3000/health"
curl "http://localhost:3000/api/hotels?city=delhi"
curl "http://localhost:3000/api/hotels?city=delhi&minPrice=5000&maxPrice=7000"
```

To stop everything:

```bash
docker compose down
```

## Postman

Import `postman/Hotel-Offer-Orchestrator.postman_collection.json` to run the
prepared test cases (valid city, no-results city, supplier-down simulation, health check).
