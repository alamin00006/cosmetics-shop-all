 
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ClientUserServices } from './clientUser.service'
import { IClientUser } from './clientUser.interface'

// CREATE
const createClientUser = catchAsync(async (req, res) => {
  const clientUserData = req.body
  const result = await ClientUserServices.createClientUserFromDB(clientUserData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client User created successfully!',
    data: result,
  })
})

// GET ALL
const getAllClientUser = catchAsync(async (req, res) => {
  const result = await ClientUserServices.getAllClientUserFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client Users retrieved successfully!',
    data: result,
  })
})

// GET SINGLE
const getSingleClientUser = catchAsync(async (req, res) => {
  const { clientId } = req.params
  // console.log(clientId);
  
  const result = await ClientUserServices.getSingleClientUserFromDB(clientId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client User retrieved successfully!',
    data: result,
  })
})

// DELETE
const deleteClientUser = catchAsync(async (req, res) => {
  const { clientId } = req.params
  const result = await ClientUserServices.deleteClientUserFromDB(clientId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client User deleted successfully!',
    data: result,
  })
})

// UPDATE
const updateClientUser = catchAsync(async (req, res) => {
  const { clientId } = req.params
  const updatedData = req.body

  const result = await ClientUserServices.updateClientUserIntoDB(
    clientId,
    updatedData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client User updated successfully!',
    data: result,
  })
})

export const ClientUserController = {
  createClientUser,
  getAllClientUser,
  getSingleClientUser,
  deleteClientUser,
  updateClientUser,
}
