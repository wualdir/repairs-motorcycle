import { Request, Response } from "express";
import { UserServices } from "../services/user.service";

export class UserController {
  constructor(public readonly UserServices: UserServices) {}


  createUser = (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    this.UserServices.CreateUser({ name, email, password })

      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error: any) => {
        return res.status(500).json(error);
      });
  };

  getUser = (_: Request, res: Response) => {
    this.UserServices.findAllUsers()
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((error: any) => {
        return res.status(500).json(error);
      });
  };


  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }
    this.UserServices.findOneUserById(+id)

      .then((user) => {
        return res.status(200).json(user);
      })

      .catch((error: any) => {
        return res.status(500).json(error);
      });
  };

  
  updategetUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }

    this.UserServices.updateUser({ name, email, password }, +id)

      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((error: any) => {
        console.log(error);
        return res.status(500).json(error);
      });
  };

  
  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(204).json();
  };
}
