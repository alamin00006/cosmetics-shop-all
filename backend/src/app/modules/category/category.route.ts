import express from 'express'
import { CategoryController } from './category.controller'

const router = express.Router()

router.post(
  '/create-category',
  //   validateRequest(AuthValidation.loginValidationSchema),
  // auth(USER_ROLE.USER),
  CategoryController.createCategory,
)

// Get all categories
router.get('/all', CategoryController.getAllCategory)

// Get single category
router.get('/:categoryId', CategoryController.getSingleCategory)

// Update category
router.patch('/update/:categoryId', CategoryController.updateSingleCategory)

// Delete category
router.delete('/delete/:categoryId', CategoryController.deleteSingleCategory)

export const CategoryRoutes = router
