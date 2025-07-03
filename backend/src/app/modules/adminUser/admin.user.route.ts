import express from 'express'
import { AdminUserController } from './admin.user.controller'

const router = express.Router()

router.post('/', AdminUserController.createAdminUser)

export const AdminUserRoutes = router
