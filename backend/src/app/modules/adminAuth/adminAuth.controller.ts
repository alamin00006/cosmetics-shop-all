import { Request, Response, RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { AdminAuthService } from './adminAuth.service'

import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { LoginRequestBody, LoginResponse } from './adminAuth.interface'

// ----Login Controller------
const createLogin: RequestHandler = catchAsync(
  async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const user = req.body

    const result = await AdminAuthService.createLogin(user)

    sendResponse<LoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully!',
      data: result,
    })
  },
)

export const AdminAuthController = {
  createLogin,
}
