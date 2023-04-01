import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film } from './film.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Actor } from './actor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Film,Actor])],
  controllers: [FilmController],
  providers: [FilmService]
})
export class FilmModule {}
