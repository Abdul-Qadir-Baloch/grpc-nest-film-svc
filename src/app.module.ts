import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import {join} from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppLoggerMiddleware } from './middleware/logger';
import { SeedingService } from './seeders/seeding.service';
console.log(__dirname)
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
           dirname: process.cwd(), //path to where save loggin result 
          filename: 'access.log', //name of file where will be saved logging result
          level: 'debug',
        }),
        // new winston.transports.File({
        //   dirname: path.join(__dirname, './../log/info/'),
        //   filename: 'info.log',
        //   level: 'info',
        // }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'auth',
      username: 'postgres',
      password: 'dahani123',
      entities: ['dist/**/*.entity.{ts,js}'],
      autoLoadEntities:true,
      synchronize: true, // never true in production!
      
      
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,SeedingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}