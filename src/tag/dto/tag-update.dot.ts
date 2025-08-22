import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './tag-create.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}
