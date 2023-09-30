# Use the Alpine Linux base image
FROM node:18.4.0-alpine

USER node

# Create a directory for your application and set it as the working directory
WORKDIR /home/node/app

COPY package.json ./

RUN npm install

USER root

COPY . .

USER root

RUN chmod +x index.js

RUN npm link

USER node

# Start your application (replace this with your actual application command)
CMD ["/bin/sh"]