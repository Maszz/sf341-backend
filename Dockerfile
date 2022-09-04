###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-alpine 

WORKDIR /usr/src/app
COPY ./dist/apps/backend .
COPY ./apps/backend/src/schema.prisma ./prisma/ 
# COPY --chown=node:node package.json package-lock.json ./
ENV PORT=3333

# RUN npm ci
RUN npm install --production
RUN npm install @prisma/client


RUN npx prisma generate
CMD node ./main.js

USER node
