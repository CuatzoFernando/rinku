import { Request, Response } from "express"
import { handleHttp } from "../util"
import { insertCheckinService, insertCheckoutService, lastCheckinByWorker } from "../services/register.service"
import { getWorkerByIdentificatorService, updateWorkerService } from "../services/worker.service"
import { IRegister, IWorker, ILastCheckin } from "../interfaces"
import { Register } from "../models/Register"
import { convertUTCDateToLocalDate } from "../util"

const verifyWorker = async (identificator:string) => {
	/// obtenemos la información del trabajador por medio de su identificador único
	const verifyWorker= await getWorkerByIdentificatorService(identificator) as IWorker
	return verifyWorker 
}
const createCheckin = async ({ body }: Request, res: Response) => {
	//// convertimos la fecha y hora en tiempo local
	const date = await convertUTCDateToLocalDate(new Date())
	/// regresamos información del trabajador
	const worker = await verifyWorker(body.identificator)
	if (worker) {
		//// creamos un objeto con la información que necesitamos
		const data: IRegister = {
			workerID: worker.id,
			coverShift: worker.coverShift,
			checkin: date
		}
		
		let response: any = {}
		response.coverShift = worker.coverShift
		response.role = worker.roleID
		
		try {
			//// insertamos un nuevo registro con nuestro objeto
			response.response = await insertCheckinService(data)
			res.send(response)
		} catch (e) {
			handleHttp(res, "ERROR_GET_ITEMS")
		}
	} else {
		handleHttp(res, "SIN REGISTRO DEL USUARIO")
	}
}

const lastCheckin = async (id: number) => {
	///// información del último checkin del trabajador
	const last = await lastCheckinByWorker(Number(id)) 
	if (last === false) {
		return false
	} else {
		return last
	}
}

const substractTimes = async(checkin:any, checkout: Date) => {
	const difference = (checkout.getTime() - new Date(String(checkin)).getTime())
	///// result es igual a la resta de las horas (checkout - checkin) a este valor se le restan 2 horas (comida)
	const result = ((difference) as number - (7200000) as number)
	return result
}

const createCheckout = async ({ body }: Request, res: Response) => {
	const worker = await verifyWorker(body.identificator) as IWorker
	if (worker) {
		////// función para obtener el último checkin del trabajador
		let lastIdByWorker:ILastCheckin = await lastCheckin(Number(worker.id)) as ILastCheckin

		// asignamos checkout convirtiendo la fecha y hora locales
		lastIdByWorker.checkout = await convertUTCDateToLocalDate(new Date())

		///// evaluamos si tiene coverShift
		if (worker.coverShift !== 0) {
			/// función para restar las fechas (checkout - checkin) en milisegundos
			lastIdByWorker.countHourscoverShift = await substractTimes(lastIdByWorker.checkin, lastIdByWorker.checkout)
			lastIdByWorker.countHours = 0
			//// actualizamos al trabajador para que regrese al rol original
			const item: IWorker = {
				id: Number(worker.id),
				coverShift: 0
			}
			const updateWorkerCoverShift = await updateWorkerService({ ...item })
		} 

		if (worker.coverShift === 0 || lastIdByWorker.coverShift === null) {
			lastIdByWorker.countHourscoverShift = 0
			/// función para restar las fechas (checkout - checkin) en milisegundos
			lastIdByWorker.countHours = await substractTimes(lastIdByWorker.checkin, lastIdByWorker.checkout)
		}

		try {
			//// actualizamos el registro con checkin, checkout, conteo de horas en milisegundos, coverShift a 0
			const response = await insertCheckoutService(lastIdByWorker)
			res.send(response)
		} catch (e) {
			handleHttp(res, "ERROR_GET_ITEMS")
		}
	} else {
		handleHttp(res, "SIN REGISTRO DEL USUARIO")
	}
}

const verifyCheck = async ({ body }: Request, res: Response) => {
	const worker = await verifyWorker(body.identificator)
	if (worker) {
		//// creamos un objeto con la información que necesitamos
		let lastIdByWorker:ILastCheckin = await lastCheckin(Number(worker.id)) as ILastCheckin
		if (!lastIdByWorker) {
			res.send({ ruta: 'checkin' })
		} else {
			try {
				if (lastIdByWorker.checkout) {
					res.send({ ruta: 'checkin' })
				} else {
					res.send({ ruta: 'checkout' })
				}
			} catch (e) {
				handleHttp(res, "ERROR_GET_ITEMS")
			}
		}
		
	} else {
		handleHttp(res, "SIN REGISTRO DEL USUARIO")
	}
}

export { createCheckin, createCheckout, verifyCheck}