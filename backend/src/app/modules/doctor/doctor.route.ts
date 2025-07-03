import express from 'express'
import { DoctorsController } from './doctor.controller'

const router = express.Router()

router.post('/create-doctor', DoctorsController.createDoctor)
router.get('/', DoctorsController.getDoctors)

export const DoctorRoutes = router
