import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IPermission } from './permission.interface'
import { PermissionService } from './permission.service'
import httpStatus from 'http-status'

const createPermission = catchAsync(async (req, res) => {
  const permissionData = req.body
  console.log(permissionData)
  const permissions = [
    { name: 'view_dashboard' },
    { name: 'view_users' },
    { name: 'edit_users' },
    { name: 'delete_users' },
    { name: 'manage_companies' },
    { name: 'create_bookings' },
    { name: 'view_reports' },
  ]

  await PermissionService.createPermission(permissionData)

  sendResponse<IPermission>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Permission created successfully!',
  })
})

export const PermissionController = {
  createPermission,
}
