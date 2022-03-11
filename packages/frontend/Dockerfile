FROM node:17-alpine

WORKDIR /frontend

COPY package.json .

RUN npm install -f

COPY . .

EXPOSE 8001

CMD ["npm", "run", "dev"]