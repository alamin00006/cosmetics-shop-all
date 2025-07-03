import { Document, ObjectId } from "mongoose"
import { Role } from "../../../enums/role"
import { Status } from "../../../enums/status"
import { IPermission } from "../userPermission/permission.interface"

export interface IAdminUser extends Document {
    id: string
    email: string
    password: string
    role: Role
    hospital?: ObjectId
    doctor?: ObjectId
    admin?: ObjectId
    SuperAdmin?: ObjectId
    permissions?:IPermission
    status: Status
    comparePassword(password: string): Promise<boolean>
  }