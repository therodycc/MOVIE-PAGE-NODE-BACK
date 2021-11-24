import { Router } from "express";
import actorsController from "../controllers/ActorsController";

class ActorsRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/", actorsController.get);
    this.router.get("/:id", actorsController.getOne);
    this.router.get("/:id/movies", actorsController.getMoviesFromAnActor);
    this.router.post("/", actorsController.create);
    this.router.put("/:id", actorsController.update);
    this.router.delete("/:id", actorsController.delete);
  }
}

const actorsRoutes = new ActorsRoutes();
export default actorsRoutes.router;
