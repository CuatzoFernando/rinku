import { Request, Response, Router } from "express"
import { createDelivery } from "../controllers/delivery.controller"

const router = Router()

router.post("/", createDelivery)

export { router }