import { Router } from "express";
import { RepairsController } from "./controller";
import { RepairsServices } from "../services/repair.service";

export class RepairRoutes {
  static get routes(): Router {
    const router = Router();

    const RepairService = new RepairsServices();
    const controller = new RepairsController(RepairService);

    router.post("/", controller.createRepairs);
    router.get("/", controller.getRepairs);
    router.get("/:id", controller.getRepairsById);
    router.patch("/:id", controller.updategetRepairs);
    router.delete("/:id", controller.deleteRepairs);

    return router;
  }
}
