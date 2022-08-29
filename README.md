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

first migrate schema to db table use

```bash
# This command do db operation for sync and create table to match schema. 
$ npx prisma migrate dev -n init 
```
then open backend dev server

```bash
# run backend server
$ yarn start:dev
# or
$ npm run start:dev
```

## Prisma ORM Command ()
additional command for automatic interact with databse database
```bash
# when change prisma schema run this command to sync schema to db 
$ npx prisma migrate dev -n <name>
# this command will hard reset the database (all data will be deleted), then do all migration apply.
$ npx prisma migrate reset 
# deploy 
$ npx prisma migrate deploy 
```
## What Prisma migration do .
```sql
-- CreateTable
CREATE TABLE `Message` (
    `sender_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `senderName` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`sender_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `context` VARCHAR(191) NOT NULL,
    `timestamp` DATE NOT NULL,

    INDEX `timestamp_1`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `hashpw` VARCHAR(1000) NOT NULL,
    `hashedRt` VARCHAR(1000) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## มีปัญหาไรทักเฟสบุค ขอบคุณ



