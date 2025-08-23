import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as argon2 from 'argon2';

@Injectable()
export class ArgonProvider extends HashingProvider {
  /**
   * Hashes a plain text password using argon2.
   *
   * @param password - The plain text password to be hashed.
   * @returns A promise that resolves to the hashed password.
   */
  public async hashPassword(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  /**
   * Compares a plain text password with a hashed password to check if they match.
   *
   * @param plainPassword - The plain text password provided by the user.
   * @param hashPassword - The hashed password stored in the database.
   * @returns A promise that resolves to `true` if the passwords match, otherwise `false`.
   */
  public async comparePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashPassword, plainPassword);
  }
}
