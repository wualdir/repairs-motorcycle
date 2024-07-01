import { byCriptAdapter, jwtAdapter } from "../../config";
import { User } from "../../data";
import { CreateUserDto, CustomError, UpdateUserDto } from "../../domain";


enum Rol {
  CLIENT = "CLIENT",
  EMPLOYEE = "EMPLOYEE",
}

enum Client {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class UserServices {
  constructor() {}

 
  async CreateUser(UserData: CreateUserDto) {
    
    const userExist = await User.findOne({
      
      where: {
        email:UserData.email,
        status:Client.ACTIVE
      },
    });

    if (userExist) {
      throw CustomError.badRequest('email already exist')
    }
    
    const user = new User();
    user.name = UserData.name.toLowerCase().trim();
    user.email = UserData.email.toLowerCase().trim();
    user.password = byCriptAdapter.hash(UserData.password);
    user.rol=Rol.CLIENT;
    user.status=Client.ACTIVE;
    
    try {

      await user.save(); 
     const token = await jwtAdapter.generateToken({id:user.id})  
     if(!token) throw  CustomError.InternalServer('error while creating JWT')

      return{
        token,
        user,
      }
    } catch (error: any) {
      throw  CustomError.InternalServer("something went very wrong 🧨 ")
    }
  }

  async findAllUsers() {
    try {
      return await User.find({
        where:{
          status:Client.ACTIVE
        }
      });
    } catch (error: any) {
      throw  CustomError.InternalServer("something went very wrong 🧨 ")
    }
  }

  async findOneUserById(id: number) {
    
      const user = await User.findOne({
        where: {
          id: id,
          status:Client.ACTIVE
        },
      });

      if (!user) {
        throw CustomError.notFound(`user by id ${id} not found`)
      }
      return user;  
  }

  async updateUser(UserData: UpdateUserDto, id: number) {
    const user = await this.findOneUserById(id);

    user.name = UserData.name.toLowerCase().trim();
    user.email = UserData.email.toLowerCase().trim();
    user.password = UserData.password.trim();
    
    try {
    return  await user.save();
    } catch (error) {
      throw  CustomError.InternalServer("something went very wrong 🧨 ")
    }
  }

  async deleteUser(id: number){

    const user = await this.findOneUserById(id)
    user.status = Client.INACTIVE

    try {
      await user.save()
      return;
    } catch (error) {
      throw  CustomError.InternalServer("something went very wrong 🧨 ")
    }

  }

}
