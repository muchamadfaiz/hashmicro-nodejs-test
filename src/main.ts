import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { setupSwagger } from './common/swagger';
import { Env } from './config/env';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<INestApplication>(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      //   forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = Env.app.port || 3001;
  const baseUrl = Env.domain.backend;

  // Setting API Path
  const apiPath = Env.app.prefix;
  app.setGlobalPrefix(apiPath);

  // Enable versioning API Path
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //   Swagger Setup
  const docPath = `${apiPath}/docs`;
  setupSwagger(app, docPath);

  app.getHttpAdapter().get('/', (req, res) => {
    res.redirect(`${apiPath}/health`);
  });

  await app.listen(port, () => {
    logger.log(`Host: ${baseUrl}:${port}`);
    logger.log(`Running in ${Env.app.stage} mode`);
    logger.log(`Documentation: ${baseUrl}:${port}/${apiPath}/docs`);
  });
}
bootstrap();
