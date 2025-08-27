import { Injectable } from '@nestjs/common';
import { MatchDto } from './dto/match.dto';

@Injectable()
export class AnalyzerService {
  checkMatch(dto: MatchDto) {
    // const { input1, input2 } = dto;
    const input1 = dto.input1.replace(/\s/g, '');
    const input2 = dto.input2.replace(/\s/g, '');
    const lengthInput1 = dto.input1.length;

    let matchedCount = 0;
    const matchedChars: string[] = [];

    for (const char of input1) {
      if (input2.includes(char)) {
        matchedCount++;
        matchedChars.push(char);
      }
    }

    const percentageMatchChar = (matchedCount / lengthInput1) * 100;

    return {
      percentageMatchChar: parseFloat(percentageMatchChar.toFixed(2)),
      matchedChars,
      matchedCount,
      lengthInput1,
    };
  }
}
