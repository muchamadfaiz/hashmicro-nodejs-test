import { PaginationQueryDto } from '@/common/pagination/dto/pagination-query.dto';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class BaseTagDto {
  @ApiPropertyOptional({ example: 'Nest Js' })
  @IsOptional()
  @IsString()
  name?: string;
}

export class TagFilterDto extends IntersectionType(
  BaseTagDto,
  PaginationQueryDto,
) {}
