import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface JwtPayload {
  userId: Types.ObjectId;
  role: string;
}

export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  // expiresIn: string
): string => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '365d' });

};

// export const createToken = (
//   jwtPayload: JwtPayload,
//   secret: string,
//   expiresIn: string
// ): string => {
//   return jwt.sign(jwtPayload, secret, { expiresIn });
// };
