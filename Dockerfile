FROM node:18.16.0-alpine

WORKDIR /user/app

COPY . .
RUN npm i
RUN npx prisma generate
RUN npm run build
RUN rm -rf /user/app/node_modules
RUN npm i --omit=dev

CMD ["npm", "run", "start"]



