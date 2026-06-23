# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-06-23

### Added
- Standard Node.js TypeScript project structure, `tsconfig.json`, `package.json`, and `.gitignore`.
- Prisma database schema config with core models (`User`, `RefreshToken`, `Account`, `BalanceProjection`, `Transaction`, `LedgerEntry`, `IdempotencyKey`, `AuditLog`).
- Logging framework via `pino` and `pino-pretty`.
- Express boilerplate with security utilities (`cors`, `helmet`), JSON parser, health endpoint, and centralized routing layout.
- Centralized custom HTTP error framework (`CustomError`, `BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `InternalServerError`).
- Global error handling Express middleware.
- Request validator middleware utilizing `zod`.
- Jest testing configuration and core suite integrations (`jest.config.ts`, `tests/health.test.ts`).
