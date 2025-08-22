import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const Env = {
  app: {
    name: config.get<string>('APP_NAME'),
    port: config.get<number>('APP_PORT'),
    stage: config.get<string>('APP_STAGE'),
    prefix: config.get<string>('API_PREFIX'),
  },
  domain: {
    frontend: config.get<string>('FRONTEND_DOMAIN'),
    backend: config.get<string>('BACKEND_DOMAIN'),
  },
  jwt: {
    secret: config.get<string>('JWT_SECRET'),
    expiration: config.get<string>('JWT_EXPIRATION'),
  },
  db: {
    url: config.get<string>('DATABASE_URL'),
  },
  mail: {
    host: config.get<string>('MAIL_HOST'),
    port: config.get<number>('MAIL_PORT'),
    user: config.get<string>('MAIL_USERNAME'),
    pass: config.get<string>('MAIL_PASSWORD'),
  },
};
