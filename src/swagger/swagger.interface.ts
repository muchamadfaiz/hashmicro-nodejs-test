/**
 * Specify configuration for the swaggger UI
 */
export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  servers: Array<{
    url: string;
    description: string;
  }>;
}
