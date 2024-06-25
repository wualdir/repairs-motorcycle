import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
@Entity()
export class Repairs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  unique: true;

  @Column({
    type: "date",
    nullable: false,
  })
  date: string;

  @Column({
    nullable: false,
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({
    nullable: false,
  })
  id_user: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
