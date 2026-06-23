# Event-Sourced Double-Entry Ledger Backend

A production-grade, transactionally-secure, event-sourced financial ledger API designed using Clean Architecture principles. It implements double-entry bookkeeping, CQRS read projections via BullMQ/Redis, optimistic concurrency controls, strict idempotency keys, and security best practices.

---

## Architecture Overview

```
                          +------------------+
                          |   HTTP Clients   |
                          +--------+---------+
                                   |
                                   v
                          +--------+---------+
                          |   Routes/APIs    |
                          +--------+---------+
                                   |
                                   v
                          +--------+---------+
                          |   Controllers    |
                          +--------+---------+
                                   |
                                   v
                          +--------+---------+
                          |     Services     |
                          +--------+---------+
                                   |
                +------------------+------------------+
                |                                     | (Asynchronous CQRS)
                v (Write Model)                       v
      +---------+----------+                +---------+----------+
      |    Repositories    |                |    BullMQ Events   |
      +---------+----------+                +---------+----------+
                |                                     |
                v                                     v
      +---------+----------+                +---------+----------+
      |     Prisma ORM     |                |  Projection Worker |
      +---------+----------+                +---------+----------+
                |                                     |
                v                                     v
      +---------+----------+                +---------+----------+
      |  PostgreSQL (DB)   |                |   Redis Cache /    |
      |   (Ledger Entries) |                |   Projections DB   |
      +--------------------+                +--------------------+
```

### Architectural Principles
- **Clean Architecture**: Decoupled layers. Logic flows inwards: `Controller -> Service -> Repository`.
- **Event Sourcing**: Accounts do not have a mutable "balance" column directly altered in the database. Instead, balances are derived from the aggregate sum of immutable `LedgerEntry` events.
- **Double-Entry Bookkeeping**: Every transaction consists of multiple ledger entries (debit/credit) where `Sum(Debits) == Sum(Credits)`.
- **CQRS (Command Query Responsibility Segregation)**: Writes append records directly to PostgreSQL ledger entries. Reads query the `BalanceProjection` read model which is updated asynchronously via background queue workers (BullMQ) and cached in Redis.

---

## Tech Stack
- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **In-Memory Cache**: Redis
- **Message Queue**: BullMQ
- **Validation**: Zod
- **Testing**: Jest & Supertest
- **Logging**: Pino

---

## Project Structure
Refer to [PROJECT_STATE.md](file:///c:/Projects/Event%20Source%20Ledger/PROJECT_STATE.md) for the detailed layout and folder descriptions.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Redis

### Setup Configuration
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your PostgreSQL database credentials and Redis details.

### Database Setup
To generate the Prisma Client:
```bash
npx prisma generate
```

To run migrations and apply the schema:
```bash
npx prisma migrate dev
```

### Running the Application
- **Development Mode**: `npm run dev`
- **Build**: `npm run build`
- **Production Start**: `npm start`

---

## Testing

To run the full suite of unit and integration tests:
```bash
npm run test
```

To view test coverage details:
```bash
npm run test:coverage
```
