import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from '../auth/provider/hash/hashing.provider';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { createFilter } from './helper/user.helper';
import { PaginationProvider } from '@/common/pagination/pagination.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private hashingProvider: HashingProvider,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findAll(dto: UserFilterDto) {
    const where = createFilter(dto);
    return await this.paginationProvider.paginateQuery(
      dto,
      this.userRepo,
      where,
    );
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: { profile: true },
    });
    return user;
  }

  async createOne(createUserDto: CreateUserDto) {
    const { password, profile, ...rest } = createUserDto;

    const base: Partial<User> = {
      ...rest,
      password: await this.hashingProvider.hashPassword(password),
    };

    const relation: Partial<User> = {};

    if (profile) {
      const newProfile = this.profileRepo.create(profile);
      const savedProfile = await this.profileRepo.save(newProfile);
      relation.profile = savedProfile;
    }

    const final: Partial<User> = {
      ...base,
      ...relation,
    };

    const newUser = this.userRepo.create(final);
    return await this.userRepo.save(newUser);
  }

  async updateOne(id: number, updateUserDto: CreateUserDto) {
    const { password, profile, ...rest } = updateUserDto;
    console.log(updateUserDto);
    const user = await this.findOne(id);
    console.log('PROFILE:', profile);

    const base: Partial<User> = {
      ...rest,
    };

    if (password) {
      base.password = await this.hashingProvider.hashPassword(password);
    }

    const relation: Partial<User> = {};

    if (profile && user.profile?.id) {
      await this.profileRepo.update(user.profile.id, profile);
      relation.profile = await this.profileRepo.findOne({
        where: { id: user.profile.id },
      });
    } else if (profile) {
      const newProfile = this.profileRepo.create(profile);
      const savedProfile = await this.profileRepo.save(newProfile);
      relation.profile = savedProfile;
    }

    const final = { ...base, ...relation };

    return await this.userRepo.update(id, final);
  }

  async deleteOne(id: number) {
    const user = await this.findOne(id);
    await this.userRepo.delete(id);
    await this.profileRepo.delete(user.profile.id);
    return { deleted: true };
  }
}
