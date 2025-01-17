# Just in case

Admin panel with backend 

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


## Docker 

Run with docker (needs docker-compose): docker compose up -d --build

- client -> http://localhost (nginx)
- backend -> http://localhost:3001 or http://localhost/api (nginx)