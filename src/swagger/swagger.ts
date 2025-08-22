import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .addBearerAuth();

  // Add all server
  SWAGGER_CONFIG.servers.forEach((server) => {
    builder.addServer(server.url, server.description);
  });

  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}

export function setupSwagger(app: INestApplication, path: string) {
  const document = createSwaggerDocument(app);
  SwaggerModule.setup(path, app, document);
}
