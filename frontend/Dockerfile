# frontend/Dockerfile

FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=optional

RUN npm install @rollup/rollup-linux-x64-gnu --no-save

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]