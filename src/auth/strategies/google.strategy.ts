import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { config } from 'dotenv';
config();

export interface GoogleUser {
  provider: 'google';
  providerId: string;
  email?: string;
  name?: string;
  picture?: string;
  accessToken: string;
}
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'default-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default-client-secret',
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,

    profile: Profile,

    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;

    const user: GoogleUser = {
      provider: 'google',
      providerId: id,
      email: emails && emails[0].value,
      name: `${name?.givenName || ''} ${name?.middleName || ''} ${name?.familyName || ''}`.trim(),
      picture: photos && photos[0].value,
      accessToken,
    };

    done(null, user);
  }
}
