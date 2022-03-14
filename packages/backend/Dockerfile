FROM node:17-alpine

RUN npm install -g nodemon ts-node

WORKDIR /backend

COPY package.json .

RUN npm install -f

COPY . .

EXPOSE 5050

CMD ["npm", "run", "dev"]