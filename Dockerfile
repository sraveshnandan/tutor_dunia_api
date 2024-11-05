#  stage 1 
FROM node:18 AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2 

FROM node:18-alipine

WORKDIR /app

COPY --from=builder /build/dist ./dist

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/package.json ./package.json


EXPOSE 5000

CMD [ "node","./dist/app.js" ]