FROM node:18-slim

WORKDIR /myapp

COPY . .

RUN apt update && apt install -y bash

RUN yarn global add expo

RUN yarn install

COPY .env.example .env