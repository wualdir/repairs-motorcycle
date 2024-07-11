import { Router } from "express";
import { UserController } from "./controller";
import { UserServices } from "../services/user.service";


export class UserRoutes {
  
  static get routes(): Router {
  const router = Router();
  
  const Userservice = new UserServices();
  const controller = new UserController(Userservice);
 
 
  router.post("/register", controller.createUser);
  // router.post("/login", controller.createUser);

  // router.post("/login", controller.createUser);
  // router.post("/register", controller.getUser);
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


