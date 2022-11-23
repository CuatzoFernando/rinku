import { Table, Model, Column, DataType, ForeignKey, BelongsTo, PrimaryKey } from "sequelize-typescript";
import { IDelivery } from "../interfaces";

import { Worker } from "./Worker";

@Table({
  timestamps: false,
  tableName: "Delivery",
})
export class Delivery extends Model<IDelivery> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  bonus!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateInsert!: Date;

  @ForeignKey(() => Worker) @Column workerID!: number;
  @BelongsTo(() => Worker) worker: Worker;
}