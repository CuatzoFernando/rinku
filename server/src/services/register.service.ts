import { IRegister, ILastCheckin } from "../interfaces"
import { Register } from "../models/Register"
import { Op, Sequelize } from "sequelize"

const insertCheckinService = async (item: IRegister) => {
    /// servicio para crear un nuevo registro
	try {
        const response : Register | null= await Register.create({...item}, { raw : true })
        return response
    } catch (error) {
        return error
    }
}

const lastCheckinByWorker = async (item: number) => {
    /// servicio para obtener el último registro dependiendo del workerID (id del trabajador)
    const response : Register | null= await Register.findOne({attributes: ['id', 'checkin', 'checkout'], where: { workerID: item }, order: [['id', 'DESC']], limit: 1, raw: true })
    if (response) {
        return response
    } else {
        return false
    }
}

const insertCheckoutService = async (item: ILastCheckin) => {
    /// servicio para actualizar un registro
	try {
        const updateRegister = await Register.update({ ...item }, { where: {id: item.id}})
        return updateRegister
    } catch (error) {
        return error
    }
}

const getRegisterByWorkerService = async (initMonth: Date, endMonth: Date, workerID: number) => {
      const totalHours = await Register.sum('countHours', {
        raw: true,
        where: { 
            workerID: workerID,
            checkin: {
                [Op.between]: [ initMonth, endMonth]
            }
        },
      })

      const totalHoursCovershiftRole1 = await Register.sum('countHourscoverShift',{
        raw: true,
        where: { 
            workerID: workerID,
            checkin: {
                [Op.between]: [ initMonth, endMonth]
            },
            coverShift: 1
        },
      })

      const totalHoursCovershiftRole2 = await Register.sum('countHourscoverShift',{
        raw: true,
        where: { 
            workerID: workerID,
            checkin: {
                [Op.between]: [ initMonth, endMonth]
            },
            coverShift: 2
        },
      })

      return {
        totalHours: totalHours,
        coverShiftRole1: totalHoursCovershiftRole1,
        coverShiftRole2: totalHoursCovershiftRole2
      }
}

export { insertCheckinService, insertCheckoutService, lastCheckinByWorker, getRegisterByWorkerService }