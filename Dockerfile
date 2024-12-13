#  stage 1 
FROM node:lts-buster-slim AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2 

FROM node:lts-buster-slim

WORKDIR /app

COPY --from=builder /build/dist ./dist

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/package.json ./package.json

RUN rm -rf /app/node_modules/.bin /app/node_modules/*/test /app/node_modules/*/docs


EXPOSE 5000

CMD [ "node","./dist/server.js" ]