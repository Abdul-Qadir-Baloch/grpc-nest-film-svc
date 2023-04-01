import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Film } from './film.entity';
import { Actor } from './actor.entity'
import { CreateFilmRequestDto, DeleteOneRequestDto } from './film.dto';
import { CreateFilmResponse, DeleteOneResponse } from './proto/film.pb'
import { ILike } from "typeorm"

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(Film)
        private readonly filmRepository: Repository<Film>,
        @InjectRepository(Actor)

        private readonly actorRepository: Repository<Actor>) { }
// to be dealt with roles decorator added Role column  in User table 
    public async createFilm(payload: CreateFilmRequestDto): Promise<CreateFilmResponse> {
        try {
            const film: Film = new Film();
            // best is to wrap this thing into transactions  just going with the flow for now
            film.title = payload.title;
            film.release_year = payload.releaseYear;
            film.directorId = 1
            await this.filmRepository.save(film);
            for (let actorObj of payload.actors) {
                const actor: Actor = new Actor()
                actor.userId = actorObj.actorId
                actor.films = [film]
                await this.actorRepository.save(actor)
            }

            return { id: film.id, error: null, status: HttpStatus.CREATED };
        } catch (error) {
            console.log(error.message)
            return { error: ["something went wrong"], status: HttpStatus.INTERNAL_SERVER_ERROR }
        }
    }

    public async findAll(pagination, filter): Promise<{}> {
        let {page,rowsPerPage} = pagination;
        let offSet = (page -1) * rowsPerPage

        // for pagination or filter we can set limit and offset in query builder of typeorm respectively
        let [list,count ] = await this.filmRepository.findAndCount({relations: ['actors'],order:{created_at:'DESC'},skip:offSet,take:rowsPerPage})
        return {
            list,
            count
        }

    }

    public async updateFilm(updateFilmAndActorsInput) {
        const film: Film = new Film()
        try {
            film.title = updateFilmAndActorsInput.title;
            film.release_year = updateFilmAndActorsInput.releaseYear;
            film.directorId = updateFilmAndActorsInput.directorId;
            await this.filmRepository.save(film);
            for (let actor of updateFilmAndActorsInput.actors) {
                await this.actorRepository.update({ id: updateFilmAndActorsInput.id }, actor)

            }
            return { message: "updated film", status: HttpStatus.OK }

        } catch (error) {
            return { message: "Something went wrong", status: HttpStatus.INTERNAL_SERVER_ERROR }

        }
    }
    public async delete({ id }: DeleteOneRequestDto): Promise<DeleteOneResponse> {
        const film: Film = await this.filmRepository.findOne({ where: { id } });

        if (!film) {
            return { error: ['Film not found'], status: HttpStatus.NOT_FOUND };
        }
        await this.filmRepository.delete(film.id)
        return { error: null, status: HttpStatus.OK };
    }

    public async search(payload) {
        let object = await this.filmRepository.findOne({
            relations: {
                actors: true
                //auth:true  for director search or user email search
            },
            where: [
                { title: ILike(`{%${payload.title}%`) },

                { release_year: payload.releaseYear },
                { actors: { userId: payload.actorId } }
            ],
        })
        return { data: object, status: HttpStatus.OK }

    }

}