import express, { Application, Request, Response, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import { createConnection } from "typeorm";

import actorsRoutes from "./routes/ActorsRoutes";
import MoviesRoutes from "./routes/MoviesRoutes";
import popUpRoutes from "./routes/PopUpRoutes";
import indexRouter from "./routes/index";


class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: false }));
    // this.app.use((req: Request, res: Response) => {
    //   // Access to allowed domains  (ej. 'http://example.com')
    //   res.setHeader('Access-Control-Allow-Origin', '*');

    //   // Methods you want to allow
    //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    //   // supported headers (ej. 'X-Requested-With,content-type')
    //   res.setHeader('Access-Control-Allow-Headers', '*');
    // })
  }

  routes(): void {
    this.app.use("/", indexRouter);
    this.app.use("/api/actors", actorsRoutes);
    this.app.use("/api/movies", MoviesRoutes);
    this.app.use("/api/popup", popUpRoutes);
  }



  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server on port ${this.app.get("port")}`);
    });

    // connection
    createConnection()
      .then((data) => {
        console.log('db is connected with typeOrm')
      })
      .catch(error => {
        console.log(error)
      })

  }
}

const server = new Server();
server.start();

