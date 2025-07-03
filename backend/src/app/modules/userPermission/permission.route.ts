import express from 'express'
import { PermissionController } from './permission.controller'

const router = express.Router()

router.post('/', PermissionController.createPermission)

export const PermissionRoutes = router
