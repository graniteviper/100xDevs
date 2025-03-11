FROM node:22-alpine

WORKDIR /usr/bin/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]