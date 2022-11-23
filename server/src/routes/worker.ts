import { Request, Response, Router } from "express"

import { allWorkers, createWorker, deleteWorker, updateWorker, getWorker, getPayRollByWorker } from "../controllers/worker.controller"

const router = Router()

router.post("/", createWorker)
router.put("/", updateWorker)
router.post("/delete", deleteWorker)
router.get("/", allWorkers)
router.get("/:id", getWorker)
router.post("/payroll", getPayRollByWorker)
export { router }
