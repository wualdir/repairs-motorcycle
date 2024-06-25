import { User } from "../../data";
enum Status {
  ACTIVE = "ACTIVE",

  INACTIVE = "INACTIVE",
}

export class UserServices {
  constructor() {}

  async CreateUser(UserData: any) {
    console.log(UserData);

    try {
      const user = new User();
      user.name = UserData.name.toLowerCase().trim();
      user.email = UserData.email.toLowerCase().trim();
      user.password = UserData.password;
      await user.save();
      return user;
    } catch (error: any) {
      console.log(error);
    }

  }

  async findAllUsers() {
    try {
      return await User.find({});
    } catch (error: any) {
      console.log(error);
    }
  }
  async findOneUserById(id: number) {
    try {
      const user = await User.findOne({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new Error("el id no existe");
      }
      return user;
    } catch (error: any) {
      throw new Error("internal server error");
      console.log(error);
    }
  }

  async updateUser(UserData: any, id: number) {
    const user = await this.findOneUserById(id);

    user.name = UserData.name.toLowerCase().trim();
    user.email = UserData.email.toLowerCase().trim();
    user.password = UserData.password.toLowerCase().trim();

    try {
      await user.save();

      return user;
    } catch (error) {
      console.log(error);

      throw new Error("Internal Server Error");
    }
  }
}
