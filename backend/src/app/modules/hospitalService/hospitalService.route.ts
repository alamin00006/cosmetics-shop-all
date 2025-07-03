import express from 'express'
import { HospitalServiceControllers } from './hospitalService.controller'

const router = express.Router()

router.post(
  '/create-hospital-service',
  //   validateRequest(AuthValidation.loginValidationSchema),
  HospitalServiceControllers.createHospitalService,
)
router.get(
  '/',
  //   validateRequest(AuthValidation.loginValidationSchema),
  HospitalServiceControllers.getAllHospitalService,
)

router.get('/slots', HospitalServiceControllers.getSingleHospitalServiceForSlot)


router.get(
  '/:serviceId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  HospitalServiceControllers.getSingleHospitalService,
)
router.patch(
  '/:serviceId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  HospitalServiceControllers.updateSingleHospitalService,
)
router.delete(
  '/:serviceId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  HospitalServiceControllers.deleteSingleHospitalService,
)

export const HospitalServiceRoutes = router
