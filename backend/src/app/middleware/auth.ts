import jwt, { JwtPayload } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';


import catchAsync from '../../shared/catchAsync';
import ApiError from '../../errors/ApiError';
 
import config from '../../config';
import AdminUser from '../modules/adminUser/admin.user.model';
import { TUserRole } from '../../enums/role';
import ClientUser from '../modules/clientUser/clientUser.model';
 

const auth = (...requiredRoles: TUserRole[]) => {
    console.log(requiredRoles);
    
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization);

    //token comes or not from frontend
    const token = req.headers.authorization; //get from header
    // console.log(token);
    
    if (!token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'you are unauthorized user!!',
      );
    }

    //verify token
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'you are unauthorized');
    }
    // console.log(decoded);
    

    //get data from token decoded
    const { role, userId } = decoded;

    //validations
    const isUserExists = await ClientUser.findOne({ _id: userId }).select(
      '+password',
    );
    // console.log(isUserExists);
    
    if (!isUserExists) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
    }
 
    if (isUserExists?.status ===  'blocked'  || isUserExists?.isDeleted === true) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'User does not exists!! Already deleted or deactivate',
      );
    }
  
    if (requiredRoles && !requiredRoles.includes(role)) {
        // console.log('inner');
        
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'you are not  authorized user!!',
      );
    }
    req.user = decoded as JwtPayload;
    // console.log(req.user);
    
    next(); //go to next middleware
  });
};

export default auth;
