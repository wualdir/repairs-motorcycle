import { Router } from "express";
import { UserController } from "./controller";
import { UserServices } from "../services/user.service";
import { AuthMiddleware } from "../middlwares/auth.middlwares";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const Userservice = new UserServices();
    const controller = new UserController(Userservice);

    router.post("/login", controller.Login);
    router.post("/register", controller.createUser);


//middlware


    router.get("/", controller.getUser);
    router.get("/:id", controller.getUserById);
    
    router.use(AuthMiddleware.protect)

    router.patch("/:id", controller.updateUser);
    router.delete("/:id", controller.deleteUser);

    
    router.get("/profile", controller.getProfile);

    return router;
  }
}
