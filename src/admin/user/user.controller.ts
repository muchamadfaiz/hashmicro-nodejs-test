import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import {
  CreateOneUserDecorators,
  DeleteUserDecorators,
  GetAllUserDecorators,
  GetOneUserDecorators,
  UpdateOneUserDecorators,
} from './decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { RoutePath } from '@/common/decorator/route-path.decorator';
import { UserFilterDto } from './dto/user-filter.dto';

@ApiTags('User')
@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @GetAllUserDecorators()
  async findAll(@Query() query: UserFilterDto, @RoutePath() routePath: string) {
    const result = await this.userService.findAll(query);
    return {
      status: true,
      message: `success return all ${routePath}`,
      ...result,
    };
  }

  @Post()
  @CreateOneUserDecorators()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createOne(createUserDto);
  }

  @Get(':id')
  @GetOneUserDecorators()
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UpdateOneUserDecorators()
  update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  @DeleteUserDecorators()
  delete(@Param('id') id: number) {
    return this.userService.deleteOne(id);
  }
}
