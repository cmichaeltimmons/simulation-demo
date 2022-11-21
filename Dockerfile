FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN cd /usr/src/app/client
RUN rm -rf build
RUN npm install && npm run build

#run server
EXPOSE 8080
CMD [ "node", "server.js" ]