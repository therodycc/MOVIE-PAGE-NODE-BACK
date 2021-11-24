import { Request, Response } from "express";
import { Actor } from "../entity/actor.entity";
import { Movie } from "../entity/movie.entity";

class PopUpController {
  public async create(req: Request, res: Response): Promise<void> {
    const actor = await Actor.findOne(req.body.actorId, {
      relations: ["movies"],
    });
    const movie = await Movie.findOne(req.body.movieId, {
      relations: ["actors"],
    });

    if (movie && actor) {
      actor.movies = [...actor.movies, movie];
      Actor.save(actor)
        .then(() => res.json({ msg: "PopUp Save" }))
        .catch((error) => res.json(error));
    }
  }

  public async delete(req: Request, res: Response) {
    const actor = await Actor.findOne(req.params.id_actor, {
      relations: ["movies"],
    });
    const movie = await Movie.findOne(req.params.id_movie, {
      relations: ["actors"],
    });
    
    if (movie && actor) {
      const id_movie_selected_to_deleted = actor.movies.findIndex(movie => movie.id.toString() == req.params.id_movie)
      if (id_movie_selected_to_deleted == -1) return res.json('Sorry no exist')
      const data = actor.movies.splice(id_movie_selected_to_deleted, 1)
      const ActorsRes = actor.movies.filter((movie, index) => movie.id != data[0].id)
      actor.movies = [...ActorsRes];
      Actor.save(actor)
        .then(() => res.json({ msg: "PopUp DELETED" }))
        .catch((error) => res.json(error));
    }
  }
}

const popUpController = new PopUpController();
export default popUpController;
