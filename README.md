## How to use development server

Install Docker 

```bash
# pull image
$ docker pull bitnami/redis:latest
$ docker pull bitnami/mysql:latest
```
Finally run dev compose to expose database and cache server to localhost

```bash
# compose up
$ docker compose -f dev-compose.yml up
# compose down for stop server
$ docker compose -f dev-compose.yml down
```
## Components in compose
- Redis master 1 instance -> expose port 5665 to localhost
- mysql master 1 instance -> expose port 6381 to localhost
- Redis slave
- mysql slave

technically dev server load .env that preconfig for development server.
no need to addition config for development server.


then wait a bit to docker compose to initialize... 
```bash
# run backend server
$ yarn start:dev
# or
$ npm run start:dev
```

## มีปัญหาไรทักเฟสบุค ขอบคุณ



