import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
    const config = new DocumentBuilder()
    .setTitle('Cadastro de Clientes')
    .setDescription('Api de Cadastro de Clientes')
    .setVersion('1.0')
    .addTag('clientes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl()

  console.log(`Swagger application is running on: ${url}/api`)
}
bootstrap();
