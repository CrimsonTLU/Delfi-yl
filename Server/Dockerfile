FROM node:23-slim

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm install

COPY . .

RUN ls -la src

RUN npm run build && ls -la dist

EXPOSE 4000

CMD ["npm", "run", "start"]
