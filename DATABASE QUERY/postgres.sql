-- Database: MOVIES

CREATE DATABASE "MOVIES"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
CREATE TABLE authors(
	id SERIAL PRIMARY KEY ,
	full_name VARCHAR(100),
	born  VARCHAR(100),
	gender VARCHAR(100),
	photo VARCHAR(1000)
);

CREATE TABLE movies(
	id SERIAL PRIMARY KEY,
	title VARCHAR(100),
	premiere VARCHAR(100),
	gender VARCHAR(100),
	photo VARCHAR(1000)
);

CREATE TABLE actors_movies(
	id_actor int references authors(id),
	id_movie int  references movies(id)
);

INSERT INTO movies(title, premiere,gender,photo) VALUES ('VENOM 2','14/10/2021','FICTION','https://es.web.img2.acsta.net/pictures/21/08/31/16/41/4145554.jpg');
INSERT INTO authors(full_name, born,gender,photo) VALUES ('Dwayne Johnson','02/05/1972','Male.','https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UY1200_CR84,0,630,1200_AL_.jpg');

--peliculas en las que trabajo un actor

select movies.title, authors.full_name 
from movies
inner join actors_movies 
on movies.id = actors_movies.id_movie 
inner join authors
on authors.id = actors_movies.id_actor
where actors_movies.id_actor = 6;

-- todos los autores de una pelicula

select movies.title, authors.full_name 
from movies
inner join actors_movies 
on movies.id = actors_movies.id_movie 
inner join authors
on authors.id = actors_movies.id_actor
where actors_movies.id_movie = 2;


SELECT * FROM movies;
SELECT * FROM authors;
SELECT * FROM actors_movies;

