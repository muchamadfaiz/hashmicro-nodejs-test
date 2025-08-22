import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Hashmicro App Test API Documentation',
  description: 'API for Hashmicro App Test',
  version: '1.0',
  servers: [
    { url: 'http://localhost:3001', description: 'Development Server' },
  ],
};
