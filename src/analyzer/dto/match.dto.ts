import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class MatchDto {
  @ApiProperty({
    example: 'ABBCD',
    description:
      'Karakter referensi yang akan dicek kemunculannya di input2. Case-insensitive, akan diubah ke uppercase.',
  })
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  input1: string;

  @ApiProperty({
    example: 'Galant Duck',
    description:
      'Kalimat target tempat mencocokkan karakter dari input1. Akan diubah ke uppercase otomatis.',
  })
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  input2: string;
}
