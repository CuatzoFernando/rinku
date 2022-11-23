import { IRole } from "./"

export interface IWorker {
	id: number
	name?: String
	lastname?: String
	identificator?: string
	coverShift?: number
	role?: IRole | number | null
	roleID?: number
}

export interface IQueryWorker {
	initMonth: Date
	endMonth: Date
}
