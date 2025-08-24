import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { PaginationModule } from '@/common/pagination/pagination.module';
import { UserModule } from '@/admin/user/user.module';
import { Tag } from '../tag/tag.entity';

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
  imports: [
    UserModule,
    PaginationModule,
    TypeOrmModule.forFeature([Article, Tag]),
  ],
})
export class ArticleModule {}
