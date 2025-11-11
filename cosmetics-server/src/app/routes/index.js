import express from "express";
import { companyRoutes } from "../modules/company/company.route.js";

import { AdminUserRoutes } from "../modules/adminUser/adminUser.route.js";
import { UserRoutes } from "../modules/user/user.route.js";
import { marketBannerRoutes } from "../modules/marketBanner/marketBanner.route.js";
import { PRManagerRoutes } from "../modules/PRManager/prManager.route.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { notificationRoutes } from "../modules/notification/notification.route.js";
import { CompanyBankRoutes } from "../modules/companyBank/companyBank.route.js";
import { ContactUsRoutes } from "../modules/contactUs/contact.route.js";

import { OtpRoutes } from "../modules/userOtp/userOtp.route.js";
import { ProductRoutes } from "../modules/product/product.route.js";
import { MainCategoryRoutes } from "../modules/mainCategory/mainCategory.route.js";
import { CategoryRoutes } from "../modules/category/category.route.js";
import { SubCategoryRoutes } from "../modules/subCategory/subCategory.route.js";
import { BrandRoutes } from "../modules/brand/brand.route.js";
import { OrderRoutes } from "../modules/order/order.route.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/company",
    route: companyRoutes,
  },
  {
    path: "/main-categories",
    route: MainCategoryRoutes,
  },
  {
    path: "/brands",
    route: BrandRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/subcategories",
    route: SubCategoryRoutes,
  },

  {
    path: "/admin-users",
    route: AdminUserRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/user-otp",
    route: OtpRoutes,
  },
  {
    path: "/user-verify",
    route: AuthRoutes,
  },

  {
    path: "/market-banner",
    route: marketBannerRoutes,
  },
  {
    path: "/pr-manager",
    route: PRManagerRoutes,
  },

  {
    path: "/company-bank",
    route: CompanyBankRoutes,
  },
  {
    path: "/notifications",
    route: notificationRoutes,
  },
  {
    path: "/contact",
    route: ContactUsRoutes,
  },

  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
