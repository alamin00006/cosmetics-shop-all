import express from 'express'
import { OtpController } from './userOtp.controller'

const router = express.Router()

router.post('/', OtpController.createOtp)
router.get('/', OtpController.getOtp)
router.route('/').delete(OtpController.deleteOtp)

export const OtpRoutes = router
