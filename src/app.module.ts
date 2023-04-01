import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { FilmModule } from './film/film.module';
import { FilmController } from './film/film.controller';
import { FilmService } from './film/film.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'film',
      username: 'postgres',
      password: 'dahani123',
      entities: ['dist/**/*.entity.{ts,js}'],
      autoLoadEntities:true,
      synchronize: true, // never true in production!
    }),
    FilmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
