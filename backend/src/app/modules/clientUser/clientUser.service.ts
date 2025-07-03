import ClientUser from './clientUser.model'
import httpStatus from 'http-status'
import { generateClientUserId } from './clientUser.utils'
import ApiError from '../../../errors/ApiError'
import { IClientUser } from './clientUser.interface'

const createClientUserFromDB = async (
  payload: Partial<IClientUser>,
): Promise<IClientUser> => {
  if (!payload) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide user data. No data found!!!',
    )
  }

  // Generate a new client user ID
  const clientUserNewId = await generateClientUserId()
  payload.clientUserId = clientUserNewId

  // Create and save the new ClientUser
  const newClientUser = await ClientUser.create(payload)

  if (!newClientUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create ClientUser!')
  }
  return newClientUser
}

const getAllClientUserFromDB = async () => {
  const result = await ClientUser.find()
  console.log(result)

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved all client user data!!',
    )
  }
  return result
}

const getSingleClientUserFromDB = async (clientId: string) => {
  if (!clientId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ' Please provide Client User id. No client user Id found!!',
    )
  }
  console.log(clientId)

  const result = await ClientUser.findOne({ _id: clientId })
  // console.log('Result:', result)

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved single Client User data!!',
    )
  }
  return result
}

const deleteClientUserFromDB = async (clientId: string) => {
  if (!clientId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ' Please provide client user id. No client user found!!',
    )
  }
  const deleteClientUser = await ClientUser.findByIdAndDelete({
    _id: clientId,
  })

  if (!deleteClientUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete client User')
  }

  return deleteClientUser
}

const updateClientUserIntoDB = async (
  clientId: string,
  payload: Partial<IClientUser>,
) => {
  const { ...remainingAdminData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  }

  // if (name && Object.keys(name).length) {
  //   for (const [key, value] of Object.entries(name)) {
  //     modifiedUpdatedData[`name.${key}`] = value;
  //   }
  // }

  const result = await ClientUser.findOneAndUpdate(
    { clientId },
    { $set: modifiedUpdatedData },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}

export const ClientUserServices = {
  createClientUserFromDB,
  getAllClientUserFromDB,
  getSingleClientUserFromDB,
  deleteClientUserFromDB,
  updateClientUserIntoDB,
}
