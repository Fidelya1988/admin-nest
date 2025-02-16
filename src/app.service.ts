import { Get, Injectable, Render, Req } from '@nestjs/common';
import { decodeJwt } from './utils/jwt';
import { Request } from 'express';

export interface HomeRequest extends Request {
  cookies: {
    jwt?: string;
  };
}

@Injectable()
export class AppService {
  @Get('/')
  @Render('index')
  home(@Req() req: HomeRequest) {
    if (req.cookies && req.cookies.jwt) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const user = decodeJwt(req.cookies.jwt);
        if (user instanceof Error) {
          throw new Error('Invalid token');
        }

        if (typeof user === 'object' && 'name' in user) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return `<h1>Hello, ${user.name}!</h1> <div>You are authorized</div>`;
        } else {
          throw new Error('Invalid token payload');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Failed to decode JWT:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
        return { error: 'Failed to decode JWT' };
      }
    }
    return { error: 'JWT not provided' };
  }
}
