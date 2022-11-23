import { IWorker, IQueryWorker } from "../interfaces"
import { Worker } from "../models/Worker"

const insertWorkerService = async (item: IWorker) => {
	try {
        const response: Worker = await Worker.create({ ...item })
        return response
    } catch (error) {
        return error
    }
}

const updateWorkerService = async (item: IWorker) => {
	try {
        const response = await Worker.update({ ...item }, { where: {id: item.id}})
        return response
    } catch (error) {
        return error
    }
}

const deleteWorkerService = async (item: number) => {
	try {
        const deleteWorker = await Worker.destroy({ where: { id: item }})
        return  item
    } catch (error) {
        return error
    }
}

const allWorkerService = async () => {
	try {
        const workers: Worker[] | null = await Worker.findAll()
        return workers
    } catch (error) {
        return error
    }
}

const getWorkerService = async (id: number) => {
	try {
        const getWorker: Worker | null = await Worker.findOne({ where: { id: id }, raw: true})
        return getWorker
    } catch (error) {
        return error
    }
}

const getWorkerByIdentificatorService = async (item: string) => {
    try {
        const getWorker: Worker | null = await Worker.findOne({ where: { identificator: item }, raw: true })
        return getWorker
    } catch (error) {
        return error
    }
}

export { insertWorkerService, deleteWorkerService, updateWorkerService, allWorkerService, getWorkerService, getWorkerByIdentificatorService }
