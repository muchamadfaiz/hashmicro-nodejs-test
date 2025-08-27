import { CreateProfileDto } from '@/admin/profile/dto/profile-create.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({ example: 'johnsmith43' })
  @IsNotEmpty()
  @MaxLength(24)
  username: string;

  @ApiPropertyOptional({ example: '089813234567' })
  @IsNotEmpty()
  @MaxLength(24)
  noPhone: string;

  @ApiProperty({ example: 'secret@134' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @ApiProperty({ type: () => CreateProfileDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto | null;
}
