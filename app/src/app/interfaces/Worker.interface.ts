import { IRole } from "./"

export interface IWorker {
	id?: number
	name?: String
	lastname?: String
	identificator?: string
	coverShift?: number | string
	role?: IRole | number | null
	state?: String
	roleID?: number | String
}

export interface IQueryWorker {
	initMonth: Date
	endMonth: Date
}
