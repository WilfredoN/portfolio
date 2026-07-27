FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3001

ENV PORT=3001 \
    NODE_ENV=production

CMD ["npm", "start"]
