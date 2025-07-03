import catchAsync from '../../../shared/catchAsync'
import { IHospital } from './hospital.interface'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { HospitalService } from './hospital.service'

const createHospital = catchAsync(async (req, res) => {
  const userOthersData = req.body
  console.log(userOthersData)
  await HospitalService.createHospital(userOthersData)

  sendResponse<IHospital>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital created successfully!',
  })
})
const getHospitals = catchAsync(async (req, res) => {
  const hospitals = await HospitalService.getHospitals()

  sendResponse<IHospital[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital get successfully!',
    data: hospitals,
  })
})

const getSingleHospitalService = catchAsync(async (req, res) => {
  const { hospitalId } = req.params
  const result = await HospitalService.getSingleHospitalFromDB(hospitalId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Single Hospital is retrieved successfully  `,
    data: result,
  })
})

const getSingleHospitalAllService = catchAsync(async (req, res) => {
  const { hospitalId } = req.params
  const result =
    await HospitalService.getSingleHospitalAllServiceFromDB(hospitalId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Single Hospital All service is retrieved successfully  `,
    data: result,
  })
})

export const HospitalController = {
  createHospital,
  getHospitals,
  getSingleHospitalService,
  getSingleHospitalAllService,
}
