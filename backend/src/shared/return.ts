import httpStatus from 'http-status'
import ApiError from '../errors/ApiError'
 

const returnMessage = ( result: any,message: string ) => {
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, message)
  }
}

export default returnMessage
