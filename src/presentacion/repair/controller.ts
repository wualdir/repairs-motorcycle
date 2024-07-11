import { Request, Response } from "express";
import { RepairsServices } from "../services/repair.service";
import { CustomError } from "../../domain";
enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export class RepairsController {
  constructor(public readonly Repairservice: RepairsServices) {}

  createRepairs = (req: Request, res: Response) => {
    const { date, id_user } = req.body;

    this.Repairservice.CreateRepairs({ date, id_user })

      .then((repair) => {
        res.status(201).json(repair);
      })
      .catch((error: any) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCod).json(error.message);
        }
        console.log(error);
        return res
          .status(500)
          .json({ message: "something went very wrong 🧨 " });
      });
  };

  getRepairs = (req: Request, res: Response) => {
    this.Repairservice.findAllRepair()
      .then((repair) => {
        res.status(200).json(repair);
      })
      .catch((error: any) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCod).json(error.message);
        }
        console.log(error);
        return res
          .status(500)
          .json({ message: "something went very wrong 🧨 " });
      });
  };

  getRepairsById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      res.status(400).json({ message: "El id debe ser un numero" });
    }
    this.Repairservice.findOneRepairById(+id)

      .then((repair) => {
        res.status(200).json(repair);
      })

      .catch((error: any) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCod).json(error.message);
        }
        console.log(error);
        return res
          .status(500)
          .json({ message: "something went very wrong 🧨 " });
      });
  };

  updategetRepairs = (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, status, id_user } = req.body;

    if (isNaN(+id)) {
      res.status(400).json({ message: "El id debe ser un numero" });
    }

    this.Repairservice.updateRepair({ date, status, id_user }, +id)

      .then((repair) => {
        res.status(200).json(repair);
      })
      .catch((error: any) => {
        console.log(error);
        if (error instanceof CustomError) {
          return res.status(error.statusCod).json(error.message);
        }
        console.log(error);
        return res
          .status(500)
          .json({ message: "something went very wrong 🧨 " });
      });
  };

  deleteRepairs = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }
    this.Repairservice.deleteRepair(+id)
      .then(() => {
        res.status(204).json();
      })
      .catch((error: any) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCod).json(error.message);
        }
        console.log(error);
        return res
          .status(500)
          .json({ message: "something went very wrong 🧨 " });
      });
  };
}
