import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Movie } from "../entity/movie.entity";


class MoviesController {
  public async get(req: Request, res: Response) {
    Movie.find()
      .then((data) => {
        res.json({ msg: "Get movies", data })
      })
      .catch(error => res.json(error))
  }

  public async getOne(req: Request, res: Response) {
    Movie.findOne(req.params.id)
      .then((data) => {
        res.json({ data })
      })
      .catch(error => res.json(error))

  }
  public async getActorsFromAMovie(req: Request, res: Response) {
    const moviesRepository = getRepository(Movie);
    moviesRepository
      .findOne(req.params.id, { relations: ["actors"] })
      .then((movie) => {
        res.json({
          msg: "Get actors from an movie", data: movie?.actors
        });
      })
      .catch((error) => {
        res.json({
          msg: "Error", error
        });
      })
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const newMovie = {
        title: req.body.title,
        premiere: req.body.premiere,
        gender: req.body.gender,
        photo: req.body.photo,
      }

      const movie = Movie.create(newMovie);
      Movie.save(movie)
        .then(() => res.json({ msg: "Movie saved" }))
        .catch(error => res.json(error))
    }
    catch (error) {
      res.json({ error })
    }

  }

  public async update(req: Request, res: Response) {
    try {
      const movieNewData = {
        title: req.body.title,
        premiere: req.body.premiere,
        gender: req.body.gender,
        photo: req.body.photo
      }

      const movie = await Movie.findOne(req.params.id);

      if (movie) {
        Movie.update(req.params.id, movieNewData)
          .then((actor) => res.json({ msg: "Movie updated", movie }))
          .catch(error => res.json(error))
        return;
      }
      return res.status(404).send({ msg: 'Not found' });
    } catch (error) {
      res.json(error);
    }
  }

  public async delete(req: Request, res: Response) {

    Movie.delete(req.params.id)
      .then(() => {
        res.status(200).send({ msg: 'Movie deleted successfully' });
      })
      .catch(() => {
        res.status(500).send({ msg: 'Error deleting movie' });
      })

  }
}

const moviesController = new MoviesController();
export default moviesController;
