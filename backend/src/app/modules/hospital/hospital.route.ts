import express from 'express'
import { HospitalController } from './hospital.controller'

const router = express.Router()

router.post('/create-hospital', HospitalController.createHospital)
router.get('/', HospitalController.getHospitals)
router.get('/:hospitalId', HospitalController.getSingleHospitalService)
router.get('/hospital-service/:hospitalId', HospitalController.getSingleHospitalAllService)

export const HospitalRoutes = router
