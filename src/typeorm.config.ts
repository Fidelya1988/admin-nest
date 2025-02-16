import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './users/entities/user/user';

export const typeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USER', 'admin'),
  password: configService.get<string>('DB_PASSWORD', 'admin'),
  database: configService.get<string>('DB_NAME', 'test'),
  entities: [User],
  migrations: ['dist/migrations/*.ts'],
  synchronize: true, // Do not use synchronize in production
  logging: true,
});
