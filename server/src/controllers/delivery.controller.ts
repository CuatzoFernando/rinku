import { Request, response, Response } from "express"
import { handleHttp } from "../util"
import { insertDeliveryService } from "../services/delivery.service"
import { IDelivery } from "../interfaces"
import { convertUTCDateToLocalDate } from "../util"

const createDelivery = async ({ body }: Request, res: Response) => {
	try {
		if (body.id) {
			body.id = null
		}
		const { quantity, workerID } = body as IDelivery
		body.bonus = quantity * 5
		body.dateInsert = await convertUTCDateToLocalDate(new Date())
		const response = await insertDeliveryService(body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

export { createDelivery }