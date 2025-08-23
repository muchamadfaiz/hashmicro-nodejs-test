import { JwtService } from '@nestjs/jwt';
import { JwtProvider } from './jwt.provider';
import { JwtPayload } from '../../interface/auth.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestJwtProvider implements JwtProvider {
  constructor(private jwtService: JwtService) {}

  /**
   *
   * @param user - The user payload containing necessary claims.
   * @returns - A signed JWT access token string.
   */
  getAccessToken(user: JwtPayload) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      role_id: user.role_id,
    };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
