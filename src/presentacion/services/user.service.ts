import { User } from "../../data";

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
      console.log(error);
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
      console.log(error);
    }
  }

  async findOneUserById(id: number) {
    try {
      const user = await User.findOne({
        where: {
          id: id,
          status:Client.ACTIVE
        },
      });

      if (!user) {
        throw new Error("el usuario no existe");
      }
      return user;
    } catch (error: any) {
      throw new Error("internal server error");
     
    }
  }

  async updateUser(UserData: any, id: number) {
    const user = await this.findOneUserById(id);

    user.name = UserData.name.toLowerCase().trim();
    user.email = UserData.email.toLowerCase().trim();
    
    try {
    return  await user.save();
    } catch (error) {
      console.log(error);

      throw new Error("Internal Server Error");
    }
  }

  async deleteUser(id: number){

    const user = await this.findOneUserById(id)
    user.status = Client.INACTIVE

    try {
      await user.save()
      return;
    } catch (error) {
      throw new Error('Internal Server Error');
    }

  }

}
