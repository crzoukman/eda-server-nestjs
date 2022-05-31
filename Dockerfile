FROM node:13.12.0-alpine

# Can be anything
WORKDIR /nestjs

# Copy files to the WORKDIR
COPY package*.json ./

RUN npm install

# Copy all files to the WORKDIR(?) avoiding node_modules
COPY . .
COPY ./.env .
COPY ./.env.docker .
