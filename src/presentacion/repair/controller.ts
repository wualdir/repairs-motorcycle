import { Request, Response } from "express";
import { RepairsServices } from "../services/repair.service";
enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export class RepairsController {
  constructor(public readonly RepairServices: RepairsServices) {}

  createRepairs = (req: Request, res: Response) => {
    const { date, status, id_user } = req.body;

    this.RepairServices.CreateRepairs({ date, status, id_user })

      .then((repair) => {
        return res.status(201).json(repair);
      })
      .catch((error: any) => {
        return res.status(500).json(error);
      });
  };

  getRepairs = (req: Request, res: Response) => {
    this.RepairServices.findAllRepair()
      .then((repair) => {
        return res.status(200).json(repair);
      })
      .catch((error: any) => {
        return res.status(500).json(error);
      });
  };

  getRepairsById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }
    this.RepairServices.findOneRepairById(+id)

      .then((repair) => {
        return res.status(200).json(repair);
      })

      .catch((error: any) => {
        return res.status(500).json(error);
      });
  };

  updategetRepairs = (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, status, id_user } = req.body;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }

    this.RepairServices.updateRepair({ date, status, id_user }, +id)

      .then((repair) => {
        return res.status(200).json(repair);
      })
      .catch((error: any) => {
        console.log(error);
        return res.status(500).json(error);
      });
  };

 
  deleteRepairs = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(204).json();
  };
}
