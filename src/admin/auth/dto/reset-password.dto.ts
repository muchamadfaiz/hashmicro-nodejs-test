import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';
export class ResetPasswordDto {
  @ApiProperty({ example: 'token' })
  @Validation.IsString()
  @Validation.IsNotEmpty()
  token: string;

  @ApiProperty({ example: '12345678' })
  @Validation.IsString()
  @Validation.IsNotEmpty()
  @Validation.MinLength(6)
  newPassword: string;
}
