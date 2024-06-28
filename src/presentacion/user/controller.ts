import { Request, Response } from "express";
import { UserServices } from "../services/user.service";
import { CustomError } from "../../domain";

export class UserController {
  
  constructor(public readonly Userservice: UserServices) 
  {}

  createUser = (req: Request, res: Response) => {

    const { name, email, password } = req.body;
    this.Userservice.CreateUser({ name, email, password })
      .then((user) => {
         res.status(201).json(user);
      })
      .catch((error: any) => {
         
         if (error instanceof CustomError) {
            return res.status(error.statusCod).json(error.message)
         }
         console.log(error)
         return res.status(500).json({message:"something went very wrong 🧨 "})
      });
  };


  getUser = (_: Request, res: Response) => {
    this.Userservice.findAllUsers()
      .then((user) => {
         res.status(200).json(user);
      })
      .catch((error: any) => {
         if (error instanceof CustomError) {
            return res.status(error.statusCod).json(error.message)
         }
         console.log(error)
         return res.status(500).json({message:"something went very wrong 🧨 "})
      });
  };


  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
       res.status(400).json({ message: "El id debe ser un numero" });
    }
    this.Userservice.findOneUserById(+id)

      .then((user) => {
         res.status(200).json(user);
      })

      .catch((error: any) => {
         if (error instanceof CustomError) {
            return res.status(error.statusCod).json(error.message)
         }
         console.log(error)
         return res.status(500).json({message:"something went very wrong 🧨 "})
      })
  };

  
  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (isNaN(+id)) {
       res.status(400).json({ message: "El id debe ser un numero" });
    }

    this.Userservice.updateUser({ name, email }, +id)

      .then((user) => {
         res.status(200).json(user);
      })
      .catch((error: any) => {
         if (error instanceof CustomError) {
            return res.status(error.statusCod).json(error.message)
         }
         console.log(error)
         return res.status(500).json({message:"something went very wrong 🧨 "})
      });
  };

  
  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if(isNaN(+id)){
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }
    this.Userservice.deleteUser(+id)
    .then(() => {
      res.status(204).json();
   })
   .catch((error: any) => {
     
      if (error instanceof CustomError) {
         return res.status(error.statusCod).json(error.message)
      }
      console.log(error)
      return res.status(500).json({message:"something went very wrong 🧨 "})
   });
  };
}
