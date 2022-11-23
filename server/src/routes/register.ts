import { Request, Response, Router } from "express"

import { createCheckin, createCheckout, verifyCheck } from "../controllers/register.controller"

const router = Router()

router.post("/checkin", createCheckin)
router.post("/checkout", createCheckout)
router.post("/verify", verifyCheck)

export { router }