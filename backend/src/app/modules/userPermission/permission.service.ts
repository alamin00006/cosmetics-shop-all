import ApiError from '../../../errors/ApiError'
import { IPermission } from './permission.interface'
import Permission from './permission.model'
import httpStatus from 'http-status'
const createPermission = async (
  permission: IPermission,
): Promise<IPermission | void> => {
  // Check exists Permission Name
  const findPermission = await Permission.findOne({
    name: permission.name,
  })
  if (findPermission) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sorry! already exists with this Permission.',
    )
  }

  const newPermission = new Permission({
    ...permission,
  })
  await newPermission.save()
}
export const PermissionService = {
  createPermission,
}
