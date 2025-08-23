import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './profile-create.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  id?: number;
}
