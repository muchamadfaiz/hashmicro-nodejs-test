import { randomBytes } from 'crypto';
import { TokenProvider } from './token.provider';

export class CryptoTokenProvider implements TokenProvider {
  public async generateToken(): Promise<string> {
    return randomBytes(32).toString('hex');
  }
}
