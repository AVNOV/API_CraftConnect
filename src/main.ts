import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('CraftConnect')
    .setVersion('0.1')
    .addTag('craftconnect')
    .addBearerAuth()
    .build();
  const app = await NestFactory.create(AppModule, { cors: true });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );
  app.enableCors();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
