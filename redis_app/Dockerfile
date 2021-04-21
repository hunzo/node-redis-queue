FROM node:alpine

COPY app.js .
COPY package.json .

RUN npm install
RUN npm install pm2 -g

CMD pm2-runtime app.js -i 4