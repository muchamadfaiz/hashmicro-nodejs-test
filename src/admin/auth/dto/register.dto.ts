import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class RegisterDto {
  @ApiPropertyOptional({ example: 'user' })
  @Validation.IsOptional()
  @Validation.IsString()
  username?: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @Validation.IsNotEmpty()
  @Validation.IsString()
  email: string;

  @ApiProperty({ example: '123456' })
  @Validation.IsNotEmpty()
  @Validation.MinLength(6)
  @Validation.MaxLength(32)
  password: string;
}
