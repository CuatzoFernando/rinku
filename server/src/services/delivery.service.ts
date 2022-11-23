import { IDelivery } from "../interfaces"
import { Delivery } from "../models/Delivery"
import { Op, Sequelize } from "sequelize"

const insertDeliveryService = async (item: IDelivery) => {
	try {
        const insertDelivery: Delivery | null = await Delivery.create({ ...item })
        return insertDelivery
    } catch (error) {
        return error
    }
}

const allDeliverysByWorker = async (initMonth: Date, endMonth: Date, workerID: number) => {
    try {
        const getDelivery = await Delivery.sum('bonus',{
            raw: true,
            where: { 
                workerID: workerID,
                dateInsert: {
                    [Op.between]: [ initMonth, endMonth]
                }
            },
          })

          return {
            delivery: getDelivery
          }
    } catch (error) {
        return error
    }
}

export { insertDeliveryService, allDeliverysByWorker }