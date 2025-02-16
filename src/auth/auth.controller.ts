import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';
import { GoogleUser } from './strategies/google.strategy';
import { Response, Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: GoogleUser;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  googleAuthCallback(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const { user } = req;
    const { token } = this.authService.googleLogin(user);
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/');
  }
}
