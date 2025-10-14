FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --quiet --no-optional --no-found --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start:prod"]
