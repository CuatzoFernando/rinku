import { Request, response, Response } from "express"
import { insertWorkerService, updateWorkerService, deleteWorkerService, allWorkerService, getWorkerService } from "../services/worker.service"
import { allDeliverysByWorker } from "../services/delivery.service"
import { getRegisterByWorkerService } from "../services/register.service"
import { getAllRolesService, getRoleService } from "../services/role.service"
import { handleHttp, makeID } from "../util"
import { IRole } from "../interfaces"

const createWorker = async ({ body }: Request, res: Response) => {
	try {
		if (body.id) {
			body.id = null
		}
		body.identificator = await makeID()
		const { name, lastname, identificator, roleID } = body
		const response = await insertWorkerService(body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const updateWorker = async ({ body }: Request, res: Response) => {
	try {
		const { name, lastname, identificator, roleID, state, coverShift } = body
		const response = await updateWorkerService(body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const deleteWorker = async ({ body }: Request, res: Response) => {
	try {
		const { id } = body
		const response = await deleteWorkerService(body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const allWorkers = async (req: Request, res: Response) => {
	try {
		const response = await allWorkerService()
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const getWorker = async ({ params }: Request, res: Response) => {
	try {
		const response = await getWorkerService(Number(params.id))
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const getPayRollByWorker = async ({ body }: Request, res: Response) => {
	const { id, dateValue, roleID, state } = body
	const date = new Date(dateValue)

	//// asignamos el día inicial de un mes y la fecha final + 1 para tomar los datos de checkout
	const initMonth = new Date(date.getFullYear(), date.getMonth())
	const endMonth = new Date(date.getFullYear(), date.getMonth()+1, 0)
	const endMonthQuery = new Date(date.getFullYear(), date.getMonth()+1, 1)

	//// creamos un nuevo objeto
	let payroll:any = {
		initMonth: initMonth,
		endMonth: endMonth
	}

	/// buscamos todas las entregas realizadas
	const allDeliveries = await allDeliverysByWorker(initMonth, endMonthQuery, id) as any
	payroll.delivery = allDeliveries.delivery

	/// buscamos todos los registro (checkin y checkout)
	const allRegister = await getRegisterByWorkerService(initMonth, endMonthQuery, id) as any
	
	//// buscamos todos los roles
	const findRole = await getAllRolesService() as IRole[]
	
	findRole.forEach((role) => {
		if (roleID === role.id) {
			const hours = ((allRegister.totalHours / (1000*60*60)) % 24)  
			payroll.salaryHour = (hours * role.salary).toFixed(2)
		}

		if (allRegister.coverShiftRole1) {
			if (role.id === 1) {
				const hours = ((allRegister.coverShiftRole1 / (1000*60*60)) % 24)  
				payroll.bonusRole1 = (hours * role.salary).toFixed(2)
			}
		}

		if (allRegister.coverShiftRole2) {
			if (role.id === 2) {
				const hours = ((allRegister.coverShiftRole2 / (1000*60*60)) % 24)  
				payroll.bonusRole2 = (hours * role.salary).toFixed(2)
			}
		}
	})

	payroll.sumTotalSalary = Number(payroll.delivery) + Number(payroll.salaryHour) + Number(payroll.bonusRole1) + Number(payroll.bonusRole2)

	if (Number(payroll.sumTotalSalary) < 16000) {
		payroll.taxes = (Number(payroll.sumTotalSalary * 9) / 100).toFixed(2)
	} else {
		payroll.taxes = (Number(payroll.sumTotalSalary * 12) / 100).toFixed(2)
	}

	if (state === 'Interno') {
		payroll.voucher = (Number(payroll.sumTotalSalary * 4) / 100).toFixed(2)
	}

	res.send(payroll)

}

export { createWorker, updateWorker, deleteWorker, allWorkers, getWorker, getPayRollByWorker }
