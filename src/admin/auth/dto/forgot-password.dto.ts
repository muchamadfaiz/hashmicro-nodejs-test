import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @Validation.IsEmail()
  @Validation.IsNotEmpty()
  email: string;
}
