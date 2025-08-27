import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyzerService } from './analyzer.service';
import { MatchDto } from './dto/match.dto';
import { GetResultCheckMatchDecorators } from './decorator/analyzer.decorator';
import { RoutePath } from '@/common/decorator/route-path.decorator';
import { PaginationQueryDto } from '@/common/pagination/dto/pagination-query.dto';

@ApiTags('Analyzer')
@Controller({ path: 'analyzer', version: '1' })
export class AnalyzerController {
  constructor(private readonly analyzerService: AnalyzerService) {}
  @Post()
  @GetResultCheckMatchDecorators()
  async checkMatch(@Body() dto: MatchDto, @RoutePath() routePath: string) {
    const result = await this.analyzerService.checkMatch(dto);
    return {
      status: true,
      message: `success create one ${routePath}`,
      data: result,
    };
  }

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
    @RoutePath() routePath: string,
  ) {
    const result = await this.analyzerService.findAll(query);
    return {
      status: true,
      message: `success return all ${routePath}`,
      ...result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @RoutePath() routePath: string) {
    const result = await this.analyzerService.findOne(id);
    return {
      status: true,
      message: `success return one ${routePath}`,
      data: result,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @RoutePath() routePath: string) {
    await this.analyzerService.delete(id);
    return {
      status: true,
      message: `success delete one ${routePath}`,
    };
  }
}
