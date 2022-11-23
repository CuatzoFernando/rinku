import { Table, Model, Column, DataType, ForeignKey, BelongsTo, PrimaryKey, Default, AllowNull } from "sequelize-typescript";
import { IWorker } from "../interfaces";

import { Role } from "./Role";

enum state {
  Interno = 'Interno',
  Externo = 'Externo'
}


@Table({
  timestamps: false,
  tableName: "Worker",
})
export class Worker extends Model<IWorker> {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Za-z0-9]{4}/,
      max:4,
      min:4
    }
  })
  identificator!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  coverShift!: number;

  @Default(state.Interno)
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(state.Interno, state.Externo),
    field: 'state',
  })
  state: string;

  @ForeignKey(() => Role) @Column roleID!: number;
  @BelongsTo(() => Role) role: Role;
}