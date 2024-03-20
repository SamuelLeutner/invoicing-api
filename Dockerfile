FROM node:latest

WORKDIR /src

COPY package*.json .

RUN rm -rf node_modules && npm install

COPY . /src

EXPOSE $SERVER_PORT

CMD [ "npm", "run", "serve" ]
