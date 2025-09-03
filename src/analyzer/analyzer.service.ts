import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchDto } from './dto/match.dto';
import { Repository } from 'typeorm';
import { Analyzer } from './analyzer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from '@/common/pagination/pagination.provider';
import { PaginationQueryDto } from '@/common/pagination/dto/pagination-query.dto';

@Injectable()
export class AnalyzerService {
  constructor(
    @InjectRepository(Analyzer)
    private readonly analyzerRepo: Repository<Analyzer>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async findAll(query: PaginationQueryDto) {
    return await this.paginationProvider.paginateQuery(
      query,
      this.analyzerRepo,
    );
  }

  async findOne(id: number): Promise<Analyzer> {
    const analyzer = await this.analyzerRepo.findOne({ where: { id } });
    if (!analyzer) throw new NotFoundException('result not found');
    return analyzer;
  }

  async checkMatch(dto: MatchDto) {
    const { input1, input2 } = dto;
    // const input1 = dto.input1.replace(/\s/g, '');
    // const input2 = dto.input2.replace(/\s/g, '');

    const uniqueInput1 = Array.from(new Set(input1));
    const lengthRawInput1 = input1.length;

    let matchedCount = 0;
    const matchedChars: string[] = [];

    for (const char of uniqueInput1) {
      if (input2.includes(char)) {
        matchedCount++;
        matchedChars.push(char);
      }
    }

    const percentageMatchChar = (matchedCount / lengthRawInput1) * 100;

    const analyzer = this.analyzerRepo.create({
      ...dto,
      percentageMatchChar: parseFloat(percentageMatchChar.toFixed(2)),
      matchedCount,
      lengthRawInput1,
      matchedChars,
    });

    const saved = await this.analyzerRepo.save(analyzer);

    return { ...saved };
  }

  async delete(id: number): Promise<Analyzer> {
    const analyzer = await this.findOne(id);
    return this.analyzerRepo.remove(analyzer);
  }
}
