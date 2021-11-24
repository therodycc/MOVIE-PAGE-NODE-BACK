import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinColumn, JoinTable, OneToMany } from "typeorm";
import { Movie } from "./movie.entity";

@Entity()
export class Actor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    born: string;

    @Column()
    gender: string;

    @Column()
    photo: string;

    @ManyToMany(() => Movie, movie => movie.actors)
    movies: Movie[];
}

