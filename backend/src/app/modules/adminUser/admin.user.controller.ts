import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'

import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAdminUser } from './admin.user.interface'
import { AdminUserService } from './admin.user.service'

const createAdminUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userData, ...userOthersData } = req.body

    const result = await AdminUserService.createAdminUser(
      userOthersData,
      userData,
    )

    sendResponse<IAdminUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  },
)

const getLoginUserByEmail = catchAsync(async (req, res) => {
  const email = req?.user?.email

  // Call the service function
  const adminUserData = await AdminUserService.getLoginUserByEmail(email)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Success',
    data: adminUserData,
  })
})

export const AdminUserController = {
  createAdminUser,
}
