FROM node:23-slim

WORKDIR /app

COPY . .

RUN npm install --include=optional

EXPOSE 5173

CMD ["npm", "run", "dev"]
