import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginDecorators, MeDecorators } from './decorator/swaggger-decorator';
import { GetUser } from './decorator/get-user.decorator';
import { User } from '../user/user.entity';
import { AUTH_MESSAGES, STATUS } from './constant/string';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @LoginDecorators()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @MeDecorators()
  @Get('/me')
  me(@GetUser() user: User) {
    return {
      status: STATUS.SUCCESS,
      message: AUTH_MESSAGES.ME_SUCCESS,
      data: {
        user: user,
      },
    };
  }
}
