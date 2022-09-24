import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = ['http://localhost:3000', 'http://localhost:3333'];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || origin == undefined) {
        console.log(`${origin}` + ' is allowed');
        callback(null, true);
      } else {
        console.log(`${origin} is not allowed`);
        callback(new ForbiddenException('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('REST Endpont Doc')
    .setDescription('All avarable REST endpoints')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Application is listening on: ${await app.getHttpServer().address().port}`,
  );
}
bootstrap();
