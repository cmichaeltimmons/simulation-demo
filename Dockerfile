FROM node:18

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY . .

RUN npm install && npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]