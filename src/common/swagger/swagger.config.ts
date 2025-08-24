import { Env } from '@/config/env';
import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Hashmicro App Test API Documentation',
  description: 'API for Hashmicro App Test',
  version: '1.0',
  servers: [
    { url: Env.domain.backend + ':' + Env.app.port, description: 'Backend' },
  ],
};
