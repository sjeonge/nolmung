FROM node:lts

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "./src/app.js"]