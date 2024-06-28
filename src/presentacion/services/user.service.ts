import { User } from "../../data";
import { CustomError } from "../../domain";

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

  async CreateUser(UserData: any) {
    const user = new User();
    user.name = UserData.name.toLowerCase().trim();
    user.email = UserData.email.toLowerCase().trim();
    user.password = UserData.password.trim();
    user.rol=Rol.CLIENT;
    user.status=Client.ACTIVE;
    
    try {
     return await user.save();   
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

  async updateUser(UserData: any, id: number) {
    const user = await this.findOneUserById(id);

    user.name = UserData.name.toLowerCase().trim();
    user.email = UserData.email.toLowerCase().trim();
    
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
