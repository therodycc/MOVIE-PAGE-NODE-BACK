import { Router } from "express";
import moviesController from "../controllers/MoviesController";

class MoviesRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/",  moviesController.get);
    this.router.get("/:id", moviesController.getOne);
    this.router.get("/:id/actors", moviesController.getActorsFromAMovie);
    this.router.post("/", moviesController.create);
    this.router.put("/:id", moviesController.update);
    this.router.delete("/:id", moviesController.delete);
  }
}

const moviesRoutes = new MoviesRoutes();
export default moviesRoutes.router;