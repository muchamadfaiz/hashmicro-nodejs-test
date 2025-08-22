import { z } from 'zod';

console.log('📦 envValidation file loaded');
export const envValidationSchema = z.object({
  APP_STAGE: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_PORT: z.coerce
    .number({ message: 'APP_PORT must be a valid number ' })
    .default(3000),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRATION: z.string().default('30d'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URI').nonempty(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number({ message: 'MAIL_PORT must be a number' }),
  MAIL_USERNAME: z.string(),
  MAIL_PASSWORD: z.string(),
  FRONTEND_DOMAIN: z.string().url('FRONTEND_DOMAIN must be a valid URI '),
  BACKEND_DOMAIN: z.string().url('BACKEND_DOMAIN must be a valid URI '),
});

export type EnvSchema = z.infer<typeof envValidationSchema>;

export function validateEnv(config: Record<string, any>) {
  const result = envValidationSchema.safeParse(config);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.table(
      Object.entries(result.error.flatten().fieldErrors).map(
        ([key, value]) => ({
          field: key,
          value: config[key],
          message: value?.[0] || 'Invalid value',
        }),
      ),
    );
    throw new Error('Invalid environment variables');
  }

  return result.data;
}
