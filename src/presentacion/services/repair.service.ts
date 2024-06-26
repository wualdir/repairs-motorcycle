import { Repairs } from "../../data";

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export class RepairsServices {
  constructor() {}

  async CreateRepairs(RepairData: any) {
    // console.log(RepairData);
    const repair = new Repairs();
    repair.date = RepairData.date;
    repair.status = Status.PENDING;
    repair.id_user = RepairData.id_user;
    try {
      
    return  await repair.save();

    } catch (error: any) {
      console.log(error);
    }
  }

  async findAllRepair() {
    try {
      return await Repairs.find({
        where:{
          status:Status.PENDING
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  }
  async findOneRepairById(id: number) {
    try {
      const repair = await Repairs.findOne({
        where: {
          id: id,
          status:Status.PENDING
        },
      });

      if (!repair) {
        throw new Error("no existe cita para reparacion");
      }
      return repair;
    } catch (error: any) {
      throw new Error("internal server error");
      
    }
  }

  async updateRepair(RepairData: any, id: number) {
    const repair = await this.findOneRepairById(id);
    
    repair.date = RepairData.date;
    repair.status = Status.COMPLETED;
    repair.id_user = RepairData.id_user;
    
    try {
        await repair.save();
        return;
      } catch (error) {
        console.log(error);
  
        throw new Error("Internal Server Error");
      }
  }

  async deleteRepair(id: number){

    const repair = await this.findOneRepairById(id)
    repair.status = Status.CANCELLED

    try {
      await repair.save()
      return;
    } catch (error) {
      throw new Error('Internal Server Error');
    }

  }


}
