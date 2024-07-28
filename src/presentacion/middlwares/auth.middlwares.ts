import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { User } from "../../data";

enum Rol {
    CLIENT = "CLIENT",
    EMPLOYEE = "EMPLOYEE",
  }
  
  enum Client {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
  }

export class AuthMiddleware{
  
  static async protect(req:Request,res:Response,next:NextFunction){
        
    const authorization=req.header('Authorization')
      if(!authorization) return res.status(401).json({message:'No token provider'})
      if(!authorization.startsWith('Bearer ')) return res.status(401).json({message:'Invalid Token'})
      const token=authorization.split(' ').at(1)|| ''
      console.log(token)
     
      try {
        const payload=await jwtAdapter.validateToken<{id:number}>(token);
        if(!payload) return res.status(401).json({message:'Invalid Token'})
            const user = await User.findOne({
                where: {
                  id: payload.id,
                  status: Client.ACTIVE,
                }
              })
          
              if (!user) res.status(500).json({message:'invalid user '})
                req.body.sessionUser=user
                next()

      } catch (error) {
        return res.status(500).json({message:'something went very wrong 🧨 '})
       
      }}
}