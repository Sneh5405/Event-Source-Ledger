# Project State

This file tracks the current state of features, folders, database, and APIs for the Event-Sourced Ledger.

---

## Current Branch
- `feature/setup-and-db`

## Last Commit
- `first commit` (initial repository setup)

---

## Completed Features
- [x] Initial workspace configurations (NPM, TypeScript, Jest, Gitignore, Env)
- [x] Database Schema Design (Prisma configuration with PostgreSQL)
- [x] Logging Utility (Pino-based logger)
- [x] Custom API Error Classes and Global Error Middleware
- [x] Request Validation Middleware using Zod
- [x] Core Express App Setup and /health Endpoint
- [x] Test Suite Configuration

---

## Folder Structure

```
├── .github/
│   └── workflows/              # CI/CD Workflows
├── prisma/
│   └── schema.prisma          # Database schema models
├── src/
│   ├── config/                # Database/Redis singletons
│   │   └── database.ts
│   ├── controllers/           # Route controllers (thin layer)
│   ├── errors/                # Custom HTTP errors
│   │   └── custom-errors.ts
│   ├── middleware/            # Auth, validation, error handler middlewares
│   │   ├── error-handler.ts
│   │   └── validate.ts
│   ├── routes/                # Route registry
│   ├── services/              # Domain logic
│   ├── repositories/          # Prisma database operations
│   ├── utils/                 # General helpers and utilities
│   │   └── logger.ts
│   ├── app.ts                 # Express Application setup
│   └── index.ts               # Server Entrypoint
├── tests/                     # Jest Unit & Integration tests
│   └── health.test.ts
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── jest.config.ts
├── package.json
├── PROJECT_STATE.md
├── README.md
└── tsconfig.json
```

---

## Database Changes
We designed the Prisma schema with the following models:
1. `User` (Internal user authentication)
2. `RefreshToken` (JWT refresh token rotation)
3. `Account` (Double-entry account definitions)
4. `BalanceProjection` (CQRS Read Model for accounts)
5. `Transaction` (Aggregated double-entry transactions)
6. `LedgerEntry` (Immutable debits and credits)
7. `IdempotencyKey` (API idempotency)
8. `AuditLog` (Security and compliance audit trails)

---

## Implemented APIs
- `GET /health` (API health check)

---

## Pending Features
- [ ] Authentication (JWT + Refresh Tokens: Register, Login, Logout, Profile)
- [ ] Account management (Create, Get, Freeze, Close)
- [ ] Double-entry ledger core (Deposit, Withdraw, Transfer)
- [ ] Concurrency controls (Serializable transactions, Row-level locking)
- [ ] CQRS balance projections worker (BullMQ + Redis cache updating)
- [ ] API Idempotency engine
- [ ] Point-in-time balance and history replay
- [ ] Metrics, rate-limiting, and security hardening
- [ ] Stress testing (k6/Artillery)
- [ ] Docker Compose environment
- [ ] GitHub Actions CI workflow

---

## Environment Variables
Defined in `.env.example`:
- `PORT`
- `NODE_ENV`
- `DATABASE_URL`
- `REDIS_HOST`
- `REDIS_PORT`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_EXPIRY`
- `JWT_REFRESH_EXPIRY`

---

## Known Issues
- None.

---

## Migration History
- Schema defined. SQL Migrations will be generated upon database execution (`prisma migrate dev`).
