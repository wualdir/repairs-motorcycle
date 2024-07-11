import { Router } from "express";
import { UserController } from "./controller";
import { UserServices } from "../services/user.service";


export class UserRoutes {
  
  static get routes(): Router {
  const router = Router();
  
  const Userservice = new UserServices();
  const controller = new UserController(Userservice);
 
 
  router.post("/login", controller.Login);
  router.post("/register", controller.createUser);

  return router
 
}
}
 
  // static get routes(): Router {
  // const router = Router();

  //   const Userservice = new UserServices();
  //   const controller = new UserController(Userservice);

  //   router.post("/", controller.createUser);
  //   router.get("/", controller.getUser);
  //   router.get("/:id", controller.getUserById);
  //   router.patch("/:id", controller.updateUser);
  //   router.delete("/:id", controller.deleteUser);

  //   return router;
  //}


