import { HttpStatus, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { CreateFilmRequestDto,DeleteOneRequestDto } from './film.dto';
import { CreateFilmResponse,DeleteOneResponse, FILM_SERVICE_NAME } from './proto/film.pb'
import { FilmService } from './film.service';

export class FilmController {

    @Inject(FilmService)
    private readonly service: FilmService;
    @GrpcMethod(FILM_SERVICE_NAME, 'CreateFilm')
    private createFilm(payload: CreateFilmRequestDto): Promise<CreateFilmResponse> {
        return this.service.createFilm(payload)

    }
    @GrpcMethod(FILM_SERVICE_NAME,'Delete')
    private delete( id : DeleteOneRequestDto): Promise<DeleteOneResponse> {
        return  this.service.delete(id);

     
   }
   @GrpcMethod(FILM_SERVICE_NAME,'Search')
   private search( payload): Promise<any> {
       return  this.service.search(payload);

    
  }
  @GrpcMethod(FILM_SERVICE_NAME,'UpdateFilm')
  private updateFilm( updateFilmAndActorsInput): Promise<any> {
      return  this.service.updateFilm(updateFilmAndActorsInput);
  }
@GrpcMethod(FILM_SERVICE_NAME,'Find')
      private findAll( pagination?:any,filter?:any ): Promise<any> {
          return  this.service.findAll(pagination,filter);  
 
      }
}   