import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user-create.dto';
import { UpdateProfileDto } from '@/admin/profile/dto/profile-update.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  profile?: UpdateProfileDto;
}
