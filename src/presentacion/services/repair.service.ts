import { Repairs } from "../../data";

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export class RepairsServices {
  constructor() {}

  async CreateRepairs(RepairData: any) {
    console.log(RepairData);

    try {
      const repair = new Repairs();
      repair.date = RepairData.date.toLowerCase().trim();
      repair.status = RepairData.Status.PENDING.toLowerCase().trim();
      repair.id_user = RepairData.id_user;
      await repair.save();
      return repair;
    } catch (error: any) {
      console.log(error);
    }
  }

  async findAllRepair() {
    try {
      return await Repairs.find();
    } catch (error: any) {
      console.log(error);
    }
  }
  async findOneRepairById(id: number) {
    try {
      const repair = await Repairs.findOne({
        where: {
          id: id,
        },
      });

      if (!repair) {
        throw new Error("el id no existe");
      }
      return repair;
    } catch (error: any) {
      throw new Error("internal server error");
      console.log(error);
    }
  }

  async updateRepair(UserData: any, id: number) {
    const repair = await this.findOneRepairById(id);

    repair.date = UserData.date.toLowerCase().trim();
    repair.status = UserData.status.toLowerCase().trim();
    repair.id_user = UserData.id_user.toLowerCase().trim();

    try {
      await repair.save();

      return repair;
    } catch (error) {
      console.log(error);

      throw new Error("Internal Server Error");
    }
  }
}
