# Portfolio Feedback Server

## Setup

1. Install dependencies:
   ```sh
   pnpm install
   # or npm install
   ```
2. Seed the database:
   ```sh
   pnpm run seed
   ```
3. Start the server:
   ```sh
   pnpm start
   ```

## API

- `GET /feedbacks` — List all feedbacks
- `POST /feedbacks` — Add new feedback (JSON body)

## Notes

- SQLite DB is stored as `server/feedbacks.sqlite`
- Seed script loads from `public/data/feedbacks.json`
- Designed for low resource usage on small VMs
