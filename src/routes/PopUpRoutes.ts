import { Router } from "express";
import popUpController from "../controllers/PopUpController";

class ActorMoviesRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.post("/", popUpController.create);
    this.router.delete("/:id_actor/:id_movie", popUpController.delete);
  }
}

const actorMoviesRoutes = new ActorMoviesRoutes();
export default actorMoviesRoutes.router;