import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Actor } from "./actor.entity";

@Entity()
export class Movie extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    premiere: string;

    @Column()
    gender: string;

    @Column()
    photo: string;

    @ManyToMany(() => Actor, actor => actor.movies, { cascade: true })
    @JoinTable()
    actors: Actor[];

}

