import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

enum Rol {
  CLIENT = "CLIENT",
  EMPLOYEE = "EMPLOYEE",
}

enum Client {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  unique: true;

  @Column({
    nullable: false,
    type: "varchar",
    length:200
  })
  name: string;

  @Column({
    nullable: false,
    type: "varchar",
    length:250
  })
  email: string;

  @Column({
    nullable: false,
    type: "varchar",
    length:250
  })
  password: string;

  @Column({
    nullable: false,
    enum: Rol,
    default: Rol.CLIENT,
  })
  rol: Rol;

  @Column({
    nullable: false,
    enum: Client,
    default: Client.ACTIVE,
  })
  status: Client;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
