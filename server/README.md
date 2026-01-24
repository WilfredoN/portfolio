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

## HTTPS Reverse Proxy

- Point `api.capybara.cx.ua` DNS A record to your VM public IP.
- Ensure inbound port 443 is allowed in Azure NSG.
- Install Nginx and Certbot, enable site, and obtain TLS:
  ```sh
  sudo apt update
  sudo apt install -y nginx certbot python3-certbot-nginx
  sudo tee /etc/nginx/sites-available/api.capybara.cx.ua < ./server/deploy/nginx/api.conf
  sudo ln -s /etc/nginx/sites-available/api.capybara.cx.ua /etc/nginx/sites-enabled/api.capybara.cx.ua
  sudo nginx -t && sudo systemctl restart nginx
  sudo certbot --nginx -d api.capybara.cx.ua --redirect --non-interactive --agree-tos -m you@example.com
  ```
- Run Node server on port 3001 and set environment:
  ```sh
  CORS_ORIGIN=https://capybara.cx.ua PORT=3001 pnpm start
  ```
- Frontend `VITE_API_URL` should point to `https://api.capybara.cx.ua`.
