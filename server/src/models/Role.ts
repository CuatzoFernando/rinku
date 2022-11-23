import { Table, Model, Column, DataType, PrimaryKey } from "sequelize-typescript";
import { IRole } from "../interfaces";


@Table({
  timestamps: false,
  tableName: "Role",
})
export class Role extends Model<IRole> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  salary!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  Bonus!: number;

}