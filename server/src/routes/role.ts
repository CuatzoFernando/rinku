import { Request, Response, Router } from "express"

import { getRole, allRoles, createRole, updatedRole, deletedRole } from "../controllers/role.controller"

const router = Router()

router.post("/", createRole)
router.put("/", updatedRole)
router.delete("/", deletedRole)
router.get("/", allRoles)
router.get("/:id", getRole)

export { router }
