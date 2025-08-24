import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '@/common/pagination/pagination.module';

@Module({
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
  imports: [PaginationModule, TypeOrmModule.forFeature([Tag])],
})
export class TagModule {}
