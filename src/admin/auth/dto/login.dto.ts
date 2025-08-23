import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
