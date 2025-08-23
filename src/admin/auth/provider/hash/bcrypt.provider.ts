import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  /**
   * Hashes a plain text password using bcrypt.
   *
   * @param password - The plain text password to be hashed.
   * @returns A promise that resolves to the hashed password.
   */
  public async hashPassword(password: string): Promise<string> {
    // Generate a salt
    const salt = await bcrypt.genSalt();
    // hash the password
    return await bcrypt.hash(password, salt);
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
    return bcrypt.compare(plainPassword, hashPassword);
  }
}
