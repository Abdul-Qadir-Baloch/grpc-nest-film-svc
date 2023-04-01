
import { type } from 'os';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,ManyToMany } from 'typeorm';
import { Actor } from './actor.entity';
@Entity()
export class Film extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public title!: string;
  @Column({ type: 'varchar' })
  public release_year!: string;

  /*
   * Relation IDs
   */

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'integer' })
  public directorId!: number;
  @ManyToMany(() => Actor, (actor) => actor.films)
  actors: Actor[]


  

}