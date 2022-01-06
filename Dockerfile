FROM node:14.17 as build

WORKDIR /app_banking_ddd_nest
COPY package*.json ./
COPY ormconfig.js ./
RUN npm install
RUN npm install -g @nestjs/cli
RUN npm install -g typescript ts-node typeorm
RUN npm install -g @nestjs/typeorm
RUN npm install -g @nestjs/core
RUN npm i
COPY . .
RUN npm run build

FROM node:14.17 
WORKDIR /app_banking_ddd_nest
COPY package.json .
COPY ormconfig.js .
RUN npm install --only=production
COPY --from=build /app_banking_ddd_nest/dist ./dist
COPY --from=build /app_banking_ddd_nest/node_modules ./node_modules
CMD npm run start:prod