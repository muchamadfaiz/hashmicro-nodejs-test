import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { AUTH_ERRORS } from './constant/string';
import { HashingProvider } from './provider/hash/hashing.provider';
import { JwtProvider } from './provider/jwt/jwt.provider';
import { JwtPayload } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('email not found');
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role?.name,
      role_id: user.role?.id,
    };

    const isEqual = await this.hashingProvider.comparePassword(
      dto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const token = this.jwtProvider.getAccessToken(payload);
    const { password, verificationToken, ...rest } = user;

    return { token, rest };
  }
}
