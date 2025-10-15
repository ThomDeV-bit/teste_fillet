FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --include=dev  --quiet --no-optional --no-found --loglevel=



RUN npm run build

EXPOSE 3000

CMD ["npm","run","start:prod"]
