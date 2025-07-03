import express from 'express'
import { AdminUserRoutes } from '../modules/adminUser/admin.user.route'
import { HospitalRoutes } from '../modules/hospital/hospital.route'
import { ClientUserRoutes } from '../modules/clientUser/clientUser.route'

import { HospitalServiceRoutes } from '../modules/hospitalService/hospitalService.route'
import { DoctorRoutes } from '../modules/doctor/doctor.route'
import { ServiceDiscountsRoutes } from '../modules/serviceDiscount/discountService.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { SubCategoryRoutes } from '../modules/subCategory/subCategory.route'
import { AppointmentRoutes } from '../modules/appointments/appointments.route'
import { AdminAuthRoutes } from '../modules/adminAuth/adminAuth.route'
import { PermissionRoutes } from '../modules/userPermission/permission.route'
import { ProductRoutes } from '../modules/product/product.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/admin-user',
    route: AdminUserRoutes,
  },
  {
    path: '/admin-auth',
    route: AdminAuthRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/permission',
    route: PermissionRoutes,
  },
  {
    path: '/hospital',
    route: HospitalRoutes,
  },
  {
    path: '/doctor',
    route: DoctorRoutes,
  },
  {
    path: '/user',
    route: ClientUserRoutes,
  },

  {
    path: '/hospital-service',
    route: HospitalServiceRoutes,
  },
  {
    path: '/discount-service',
    route: ServiceDiscountsRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/sub-category',
    route: SubCategoryRoutes,
  },
  {
    path: '/appointment',
    route: AppointmentRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
