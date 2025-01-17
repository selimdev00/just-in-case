# Just in case

Admin panel with backend 

- 💪🏻 Built with Node.js, Express.js, Nuxt.js, TailwindCSS, PrimeVue and NuxtAuth
- 🚀 Deployed with Docker
- 📦 Managed with Docker Compose
- 🔒 Secured with NuxtAuth
- 🧪 Test with Jest and Playwright for E2E testing

## Tech

- Node.js
- Express.js
- Nuxt.js
- TailwindCSS
- PrimeVue
- NuxtAuth

## Client

Run client with `npm run dev` (http://localhost:3000)

## Database & server

Run migrations with `npx sequelize-cli db:migrate`

Run seeders with `npx sequelize-cli db:seed:all`

Run server with `npm run dev` (http://localhost:3001)

Run tests with `npm run test`

## Tests

Client tests are written with playwright, server tests are written with jest

Client tests are valid if seeders are included in current database

## Run with Docker 

Run with docker (needs docker-compose): docker compose up -d --build

- client -> http://localhost (nginx)
- backend -> http://localhost:3001 or http://localhost/api (nginx)

## Running locally

### Client

- Copy `.env.example` to `.env` 
- Run `npm install` 
- Run`npm run dev` (http://localhost:3000)

### Backend

- Copy `.env.example` to `.env`