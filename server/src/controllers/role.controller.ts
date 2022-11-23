import { Request, Response } from "express"
import { handleHttp } from "../util"
import { insertRoleService, updateRoleService, deleteRoleService, getAllRolesService, getRoleService } from "../services/role.service"

const createRole = async ({ body }: Request, res: Response) => {
	try {
		const { name, salary, bonus } = body
		if (body.id) {
			body.id = null
		}
		const response = await insertRoleService(body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const updatedRole = async ({ body }: Request, res: Response) => {
	try {
		const { name, salary, bonus, id } = body
		const response = await updateRoleService(body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const deletedRole = async ({ body }: Request, res: Response) => {
	try {
		const { id } = body
		const response = await deleteRoleService(body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const allRoles = async (req: Request, res: Response) => {
	try {
		const response = await getAllRolesService()
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const getRole = async ({ params }: Request, res: Response):Promise<void> => {
	try {
		const response = await getRoleService(Number(params.id))
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

export { createRole, updatedRole, deletedRole, allRoles, getRole }