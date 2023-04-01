
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Film } from './film.entity';
@Entity()
export class Actor extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;
    /*
     * Relation ID
     */
    @Column({ type: 'integer',nullable:true })
    public userId!: number;
    
    @Column({type:'varchar', nullable:true})
    public image_url : string;
    
    @Column({type:'varchar',nullable:true})
    public height: string
    
    @CreateDateColumn()
    created_at: Date;
    //  many to many relation between actor and film 
    @ManyToMany(() => Film)
    @JoinTable()
    films: Film[]

}
