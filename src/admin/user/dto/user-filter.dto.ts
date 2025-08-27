import { PaginationQueryDto } from '@/common/pagination/dto/pagination-query.dto';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class BaseUserDto {
  @ApiPropertyOptional({ example: 'Nest Js' })
  @IsOptional()
  @IsString()
  username?: string;
}

export class UserFilterDto extends IntersectionType(
  BaseUserDto,
  PaginationQueryDto,
) {}
