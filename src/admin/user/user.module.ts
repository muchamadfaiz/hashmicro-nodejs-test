import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { Profile } from '../profile/profile.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User, Role, Profile]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
