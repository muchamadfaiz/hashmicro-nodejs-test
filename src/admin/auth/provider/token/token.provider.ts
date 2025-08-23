import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TokenProvider {
  abstract generateToken(): Promise<string>;
}
