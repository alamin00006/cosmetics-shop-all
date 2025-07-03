import express from 'express'
import { ProductController } from './product.controller'

const router = express.Router()

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductDetails)

export const ProductRoutes = router
