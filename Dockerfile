###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-alpine 

WORKDIR /usr/src/app
RUN chmod -R 777 /usr/src/app
COPY ./src .
COPY ./prisma/schema.prisma ./prisma/ 
COPY ./docker-env/.env ./
COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
# COPY --chown=node:node package.json package-lock.json ./

RUN yarn install 

# RUN npm install --production
RUN yarn add @prisma/client


RUN npx prisma generate
RUN yarn build
CMD node ./dist/main.js

USER node
