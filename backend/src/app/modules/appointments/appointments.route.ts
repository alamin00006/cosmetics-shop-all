import express from 'express'
import { AppointmentControllers } from './appointments.controller'
 
 

const router = express.Router()

router.post(
  '/create-appointment',
  //   validateRequest(AuthValidation.loginValidationSchema),
  AppointmentControllers.createAppointment,
)
router.get(
  '/',
  //   validateRequest(AuthValidation.loginValidationSchema),
  AppointmentControllers.getAllAppointment,
)
router.get(
  '/:appointmentId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  AppointmentControllers.getSingleAppointment,
)
router.patch(
  '/:appointmentId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  AppointmentControllers.updateSingleAppointment,
)
router.delete(
  '/:appointmentId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  AppointmentControllers.deleteSingleAppointment,
)

export const AppointmentRoutes = router
