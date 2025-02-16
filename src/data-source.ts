import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { typeOrmConfig } from './typeorm.config';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource(typeOrmConfig(configService));
