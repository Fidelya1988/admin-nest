import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST') || 'localhost',
          port: configService.get<number>('DATABASE_PORT') || 5432,
          username: configService.get<string>('DATABASE_USER') || 'admin',
          password: 'secret',
          database: configService.get<string>('DATABASE_NAME') || 'admin_nest',
          autoLoadEntities: true,
          synchronize: true, // Don't use this in production
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
