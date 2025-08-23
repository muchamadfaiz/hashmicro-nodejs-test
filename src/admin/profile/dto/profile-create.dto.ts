import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiPropertyOptional({ example: 'John Smith' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsUrl({}, { message: 'avatarUrl must be a valid URL' })
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'lorem ipsum dolor sit amet my bio' })
  @IsOptional()
  @IsString()
  bio?: string;
}
