FROM node:12

# Create app directory
WORKDIR /usr/src/app

#install 3rd party libs
COPY package*.json ./
RUN npm install
RUN git clone https://github.com/cmichaeltimmons/OMPEval  
RUN apt update && apt-get -y install libboost-all-dev cmake
RUN npm install -g --silent node-gyp@v7.1.2

COPY . .

# Deploy client
RUN cd /usr/src/app/client && npm install && npm run build

#build addon
RUN cd /usr/src/app/OMPEval && make all
RUN node-gyp configure build

#run server
EXPOSE 8080
CMD [ "node", "server.js" ]