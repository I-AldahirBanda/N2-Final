import { Router } from "express";
import { index, show, store, update, destroy } from "../controller/RoleController.js";
export const roleRoutes = Router()

roleRoutes.get('/', index)

roleRoutes.get('/:id', show)

roleRoutes.post('/', store)

roleRoutes.put('/:id', update)

roleRoutes.delete('/:id', destroy)