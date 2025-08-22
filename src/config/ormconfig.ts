import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,

  //specific db postgre
  url: 'postgresql://neondb_owner:npg_7iOULk4Zumzn@ep-holy-mode-a1kqibc3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
  autoLoadEntities: true,
};
