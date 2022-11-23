import { IRole } from "../interfaces"
import { Role } from "../models/Role"

const insertRoleService = async (item: IRole) => {
	try {
        const data: IRole = item
        const insertRole: Role | null = await Role.create({ ...data })
        return insertRole
    } catch (error) {
        return error
    }
}

const updateRoleService = async (item: IRole) => {
    try {
        const updateRole = await Role.update({ ...item }, { where: {id: item.id}})
        return updateRole
    } catch (error) {
        return error
    }
}

const deleteRoleService = async (item: IRole) => {
    try {
        const deleteRole = await Role.destroy({ where: { id: item.id }})
        return  item
    } catch (error) {
        return error
    }
}

const getAllRolesService = async () => {
    try {
        const roles: Role[] | null = await Role.findAll({ raw: true })
        return roles
    } catch (error) {
        return error
    }
}

const getRoleService = async (id : number) => {
    try {
        const getRole: Role | null = await Role.findOne({ where: { id: id }, raw: true})
        return getRole
    } catch (error) {
        return error
    }
}


export { insertRoleService, updateRoleService, deleteRoleService, getAllRolesService, getRoleService }