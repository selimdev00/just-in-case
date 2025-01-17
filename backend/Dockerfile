FROM node:20 AS builder

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG PORT
ENV PORT=${PORT}

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=test
RUN npm run test

FROM node:20-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG PORT
ENV PORT=${PORT}

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}


WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "./server.js"]
