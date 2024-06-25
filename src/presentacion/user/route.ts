import { Router } from "express";
import { UserController } from "./controller";
import { UserServices } from "../services/user.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const UserUser = new UserServices();

    const controller = new UserController(UserUser);

    router.post("/", controller.createUser);
    router.get("/", controller.getUser);
    router.get("/:id", controller.getUserById);
    router.patch("/:id", controller.updategetUser);
    router.delete("/:id", controller.deleteUser);

    return router;
  }
}
