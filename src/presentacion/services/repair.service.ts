import { Repairs } from "../../data";
import { CustomError } from "../../domain";

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export class RepairsServices {
  constructor() {}

  async CreateRepairs(RepairData: any) {
    const repair = new Repairs();
    repair.date = RepairData.date;
    repair.status = Status.PENDING;
    repair.id_user = RepairData.id_user;
    try {
      return await repair.save();
    } catch (error: any) {
      throw CustomError.InternalServer("something went very wrong 🧨");
    }
  }

  async findAllRepair() {
    try {
      return await Repairs.find({
        where: {
          status: Status.PENDING,
        },
      });
    } catch (error: any) {
      throw CustomError.InternalServer("something went very wrong 🧨");
    }
  }
  async findOneRepairById(id: number) {
    const repair = await Repairs.findOne({
      where: {
        id: id,
        status: Status.PENDING,
      },
    });

    if (!repair) {
      throw CustomError.notFound("no existe cita para reparacion");
    }
    return repair;
  }

  async updateRepair(RepairData: any, id: number) {
    const repair = await this.findOneRepairById(id);

    repair.date = RepairData.date;
    repair.status = Status.COMPLETED;
    repair.id_user = RepairData.id_user;

    try {
      return await repair.save();
    } catch (error) {
      console.log(error);
      throw CustomError.InternalServer("something went very wrong 🧨");
    }
  }

  async deleteRepair(id: number) {
    const repair = await this.findOneRepairById(id);
    repair.status = Status.CANCELLED;

    try {
      await repair.save();
      return;
    } catch (error) {
      throw CustomError.InternalServer("something went very wrong 🧨");
    }
  }
}
