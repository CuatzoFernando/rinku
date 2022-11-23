import { IWorker } from "./Worker.interface"

export interface IDelivery {
	id: number
	bonus: number
	quantity: number
	dateInsert: Date
	workerID: IWorker | number | null
}
