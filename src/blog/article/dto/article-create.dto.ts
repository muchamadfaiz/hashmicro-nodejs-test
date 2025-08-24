import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'Understanding NestJS Modules' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This article explains how modules work in NestJS',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: true,
    description: 'Set to true if the article is published',
  })
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty({
    example: '2025-08-24T10:00:00.000Z',
    required: false,
    description: 'Optional published date (ISO format)',
  })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiPropertyOptional({
    example: 7,
    description: 'ID user penulis (role=author)',
  })
  @Type(() => Number)
  @IsInt()
  authorId?: number;

  @ApiProperty({ example: [1, 2], description: 'Daftar ID tag' })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Type(() => Number)
  tagIds: number[];
}
