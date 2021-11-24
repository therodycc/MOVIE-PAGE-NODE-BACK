import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Actor } from "../entity/actor.entity";
import { Movie } from "../entity/movie.entity";

class ActorsController {
  public async get(req: Request, res: Response) {
    Actor.find()
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => res.json(error));
  }

  public async getOne(req: Request, res: Response) {
    Actor.findOne(req.params.id)
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => res.json(error));
  }

  public async getMoviesFromAnActor(req: Request, res: Response) {
    const actorsRepository = getRepository(Actor);
    await actorsRepository
      .findOne(req.params.id, { relations: ["movies"] })
      .then((actor) => {
        return res.json({
          msg: "Get movies from an actor",
          data: actor?.movies ?? [],
        });
      })
      .catch((error) => {
        res.json({
          msg: "Error",
          error,
        });
      });
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const newActor = {
        full_name: req.body.full_name,
        born: req.body.born,
        gender: req.body.gender,
        photo: req.body.photo,
      };

      const actor = Actor.create(newActor);
      Actor.save(actor)
        .then(() => res.json({ msg: "Actor saved" }))
        .catch((error) => res.json(error));
    } catch (error) {
      res.json({ error });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const actorNewData = {
        full_name: req.body.full_name,
        born: req.body.born,
        gender: req.body.gender,
        photo: req.body.photo,
      };

      const actor = await Actor.findOne(req.params.id);

      if (actor) {
        return Actor.update(req.params.id, actorNewData)
          .then((actor) => res.json({ msg: "Actor updated", actor }))
          .catch((error) => res.json(error));
      }
      return res.status(404).send({ msg: "Not found" });
    } catch (error) {
      res.json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    Actor.delete(req.params.id)
      .then(() => {
        res.status(200).send({ msg: "Actor deleted successfully" });
      })
      .catch(() => {
        res.status(500).send({ msg: "Error deleling actor" });
      });
  }
}

const actorsController = new ActorsController();
export default actorsController;
