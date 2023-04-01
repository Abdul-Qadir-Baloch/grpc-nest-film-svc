import { IsNotEmpty, IsNumber, IsString,ValidateNested } from 'class-validator';
import {Type} from "class-transformer"
import { CreateFilmRequest,DeleteOneRequest   } from './proto/film.pb'
export class DeleteOneRequestDto implements DeleteOneRequest {
    @IsNumber({ allowInfinity: false, allowNaN: false })
    public readonly id: number;
  }
export class CreateFilmRequestDto implements CreateFilmRequest {
 
  
    @IsString()
    @IsNotEmpty()
    public readonly title: string;
  
    @IsString()
    @IsNotEmpty()
    public readonly releaseYear:string;
  
    @IsNumber({ allowInfinity: false, allowNaN: false })
    public readonly directorId: number;
    
     actors: any[];
  }
  
