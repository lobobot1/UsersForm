FROM node:18.16.0-alpine

WORKDIR /user/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
RUN rm -rf /user/app/node_modules
RUN npm i --omit=dev
RUN rm -rf app

CMD ["npm", "run", "start"]



