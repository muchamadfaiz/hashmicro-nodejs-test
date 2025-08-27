import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyzerService } from './analyzer.service';
import { MatchDto } from './dto/match.dto';
import { GetResultCheckMatchDecorators } from './decorator/analyzer.decorator';

@ApiTags('Analyzer')
@Controller({ path: 'analyzer', version: '1' })
export class AnalyzerController {
  constructor(private readonly analyzerService: AnalyzerService) {}
  @Post('checkMatch')
  @GetResultCheckMatchDecorators()
  checkMatch(@Body() dto: MatchDto) {
    const result = this.analyzerService.checkMatch(dto);
    return {
      data: result,
    };
  }
}
