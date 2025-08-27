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
import { UpdateUserDto } from './dto/user-update.dto';

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
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createOne(createUserDto);
  }

  @Get(':id')
  @GetOneUserDecorators()
  async findOne(@Param('id') id: number, @RoutePath() routePath: string) {
    const result = await this.userService.findOne(id);
    return {
      status: true,
      message: `success return one ${routePath}`,
      data: result,
    };
  }

  @Patch(':id')
  @UpdateOneUserDecorators()
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @RoutePath() routePath: string,
  ) {
    await this.userService.updateOne(id, updateUserDto);
    return {
      status: true,
      message: `success update one ${routePath}`,
    };
  }

  @Delete(':id')
  @DeleteUserDecorators()
  async delete(@Param('id') id: number, @RoutePath() routePath: string) {
    await this.userService.deleteOne(id);
    return {
      status: true,
      message: `success delete one ${routePath}`,
    };
  }
}
