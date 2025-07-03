import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { ISuperAdmin } from './superAdmin.interface'
import httpStatus from 'http-status'
import { SuperAdminService } from './superAdminService'

const createAdminUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SuperAdminService.createSuperAdmin(req.body)

    sendResponse<ISuperAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  },
)

export const UserController = {
  createAdminUser,
}
