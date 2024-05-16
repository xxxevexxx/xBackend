FROM node:20.12.0-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN apk --no-cache add --virtual .gyp python3 make g++
RUN yarn add bcrypt

RUN apk del .gyp

EXPOSE 5000

CMD ["yarn", "start:dev"]