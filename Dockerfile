###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-alpine 

WORKDIR /usr/src/app
COPY ./src .
COPY ./prisma/schema.prisma ./prisma/ 
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
# COPY --chown=node:node package.json package-lock.json ./
ENV PORT=3333

RUN npm ci
# RUN npm install --production
RUN npm install @prisma/client


RUN npx prisma generate
RUN npm run build --production
CMD node ./dist/main.js

USER node
