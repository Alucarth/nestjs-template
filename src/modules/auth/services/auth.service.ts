import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  private readonly saltRound = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRound);
  }
}
