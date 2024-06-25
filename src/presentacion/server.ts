import express, { Router } from "express";

export interface options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    //midelware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`the port is running on port ${this.port}`);
    });
  }
}
