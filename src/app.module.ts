import './config/polyfills';

import { Module } from '@nestjs/common';
import { TagModule } from '@/blog/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import { HealthController } from './common/health/health.controller';
import { AuthModule } from './admin/auth/auth.module';
import { UserModule } from './admin/user/user.module';
import { AnalyzerModule } from './analyzer/analyzer.module';
import { ArticleModule } from './blog/article/article.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => config,
    }),
    AuthModule,
    UserModule,
    AnalyzerModule,
    ArticleModule,
    TagModule,
    DashboardModule,
    PaginationModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
