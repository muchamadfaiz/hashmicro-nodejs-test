import { Module } from '@nestjs/common';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analyzer } from './analyzer.entity';
import { PaginationModule } from '@/common/pagination/pagination.module';

@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([Analyzer])],
  controllers: [AnalyzerController],
  providers: [AnalyzerService],
})
export class AnalyzerModule {}
