import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasOne, HasMany, BelongsToMany, Default, PrimaryKey } from "sequelize-typescript";
import { IRegister } from "../interfaces";

import { Worker } from "./Worker";

@Table({
    timestamps: false,
    tableName: "Register",
})
export class Register extends Model {

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    checkin!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    checkout!: Date;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
        defaultValue: 0
    })
    countHours!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    coverShift!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    countHourscoverShift!: number;

    @ForeignKey(() => Worker) @Column workerID!: number;
    @BelongsTo(() => Worker) worker: Worker;
}