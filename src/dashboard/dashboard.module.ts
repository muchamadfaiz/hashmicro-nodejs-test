import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/admin/user/user.entity';
import { Article } from '@/blog/article/article.entity';
import { Tag } from '@/blog/tag/tag.entity';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [TypeOrmModule.forFeature([User, Article, Tag])],
})
export class DashboardModule {}
