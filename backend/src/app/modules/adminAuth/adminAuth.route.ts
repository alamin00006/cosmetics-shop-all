import express from 'express'
import { AdminAuthController } from './adminAuth.controller'

const router = express.Router()

router.post('/login', AdminAuthController.createLogin)

export const AdminAuthRoutes = router
