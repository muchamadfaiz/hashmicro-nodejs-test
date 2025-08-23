import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../interface/auth.interface';

@Injectable()
export abstract class JwtProvider {
  abstract getAccessToken(payload: JwtPayload): string;
}
