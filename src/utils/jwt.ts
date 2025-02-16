import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  // Define the structure of your JWT payload here
  sub: string;
  name: string;
  iat: number;
  exp: number;
}

export function decodeJwt(token: string): JwtPayload {
  try {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded === 'object') {
      return decoded as JwtPayload;
    }
    throw new Error('Invalid token');
  } catch (error: unknown) {
    console.error(
      'Error decoding JWT:',
      error instanceof Error ? error.message : error,
    );
    throw new Error('Failed to decode JWT');
  }
}
