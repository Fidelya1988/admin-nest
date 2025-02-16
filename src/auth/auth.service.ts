import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './strategies/google.strategy';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  googleLogin(user: GoogleUser) {
    const token = this.jwtService.sign(user);
    return { user, token };
  }
}
