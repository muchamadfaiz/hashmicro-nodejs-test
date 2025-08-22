// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: Express | undefined;

async function bootstrap() {
  if (cachedServer) return cachedServer;

  const server = express();
  const adapter = new ExpressAdapter(server);
  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn'],
  });

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.init();

  cachedServer = server;
  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = await bootstrap();
  return server(req, res);
}
