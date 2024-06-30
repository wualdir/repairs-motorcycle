import { Request, Response } from "express";
import { UserServices } from "../services/user.service";
import { CreateUserDto, CustomError, UpdateUserDto } from "../../domain";


export class UserController {
  
  constructor(public readonly Userservice: UserServices) 
  {}

private handleError=(error:unknown,res:Response)=>{
   if (error instanceof CustomError) {
       res.status(error.statusCod).json({message: error.message})
   }
   console.log(error)
    res.status(500).json({message:"something went very wrong 🧨 "})
}


  createUser = (req: Request, res: Response) => {
    const [error,createDtoUser]=CreateUserDto.createUdto(req.body)
    if(error) return res.status(422).json({message:error})
    this.Userservice.CreateUser(createDtoUser!)
      .then((user) => res.status(201).json(user))
      .catch((error: unknown) => this.handleError(error,res))
  };


  getUser = (_: Request, res: Response) => {
    this.Userservice.findAllUsers()
      .then((user) => res.status(200).json(user))
      .catch((error: unknown) => this.handleError(error,res))
  };


  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
       res.status(400).json({ message: "El id debe ser un numero" });
    }
    this.Userservice.findOneUserById(+id)
      .then((user) =>res.status(200).json(user))
      .catch((error: unknown) => this.handleError(error,res))
  };

  
  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error,UpdateDtoUser]=UpdateUserDto.updateUdto(req.body)
    if(error) return res.status(422).json({message:error})
    if (isNaN(+id)) {
     return  res.status(400).json({ message: "El id debe ser un numero" });
    }

    this.Userservice.updateUser(UpdateDtoUser!,+id)
      .then((user) =>res.status(200).json(user))
      .catch((error: unknown) => this.handleError(error,res))
  };

  
  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if(isNaN(+id)){
      return res.status(400).json({ message: 'El id debe ser un numero' })
    }
    this.Userservice.deleteUser(+id)
    .then(() => res.status(204).json())
    .catch((error: unknown) => this.handleError(error,res))
    }
}
