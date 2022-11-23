import { IWorker } from "."

export interface IRegister {
	id?: number
	checkin?: Date | string
	checkout?: Date | string
	countHours?: number
	coverShift?: number
	countHourscoverShift?: number
	worker?: IWorker | number | null
	workerID?: number | string
}


export interface IRegisterCheckin {
	checkin?: Date
	coverShift?: number
	worker?: number
}

export interface ILastCheckin {
	id: number,
	checkin?: Date | String
	checkout?: Date | String
	countHourscoverShift?: number
	countHours?: number
	coverShift?: number
	response?: boolean

}