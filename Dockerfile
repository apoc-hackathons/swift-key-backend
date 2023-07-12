FROM node:18.12.1-alpine3.15 AS builder

LABEL author="Debobrata"
LABEL version="1.0.0"
LABEL description="Dockerfile for server"

WORKDIR /usr

COPY package.json yarn.lock /usr/
COPY . /usr/
RUN yarn install
RUN yarn build

FROM node:18.12.1-alpine3.15

WORKDIR /usr/build

COPY package.json yarn.lock /usr/build/
COPY --from=builder /usr/.env /usr/build/ /usr/build/
RUN yarn install --production

EXPOSE 8080
CMD ["yarn", "start"]