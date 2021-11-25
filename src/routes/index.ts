import { Router, Response, Request } from 'express'

class IndexRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('', async (req: Request, res: Response) => {
            res.json({
                routes: {
                    actorsRoute: `http://localhost:${process.env.PORT || 3000}/api/actors`,
                    moviesRoute: `http://localhost:${process.env.PORT || 3000}/api/movies`,
                    popupRoute: `http://localhost:${process.env.PORT || 3000}/api/popup`,
                    actorsMovieRoute: `http://localhost:${process.env.PORT || 3000}/api/actors/id_here/movies`,
                    moviesActorRoute: `http://localhost:${process.env.PORT || 3000}/api/movies/id_here/actors`,
                }
            })
        })
    }
}

const indexRouter = new IndexRouter();
export default indexRouter.router;