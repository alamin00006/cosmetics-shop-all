import express from 'express'
import { SubCategoryController } from './subCategory.controller'

const router = express.Router()

router.post('/', SubCategoryController.createSubCategory)
router.get('/', SubCategoryController.getSubCategories)
router.patch('/:id', SubCategoryController.updateSubCategory)

export const SubCategoryRoutes = router
