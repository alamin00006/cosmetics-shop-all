import express from 'express'
import { ServiceDiscountsControllers } from './discountService.controller'
 
 

const router = express.Router()

router.post(
  '/create-service-discount',
  //   validateRequest(AuthValidation.loginValidationSchema),
  ServiceDiscountsControllers.createServiceDiscounts,
)
router.get(
  '/',
  //   validateRequest(AuthValidation.loginValidationSchema),
  ServiceDiscountsControllers.getAllServiceDiscounts,
)
router.get(
  '/:serviceDiscountId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  ServiceDiscountsControllers.getSingleServiceDiscounts,
)
router.patch(
  '/:serviceDiscountId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  ServiceDiscountsControllers.updateSingleServiceDiscounts,
)
router.delete(
  '/:serviceDiscountId',
  //   validateRequest(AuthValidation.loginValidationSchema),
  ServiceDiscountsControllers.deleteSingleServiceDiscounts,
)

export const ServiceDiscountsRoutes = router
