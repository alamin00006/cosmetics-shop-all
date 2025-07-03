import { model, Schema } from 'mongoose'
import {
  IHospital,
  IHospitalBanners,
  IHospitalLocation,
} from './hospital.interface'
import { hospitalType } from '../../../enums/hospitalType'

const hospitalLocationSchema = new Schema<IHospitalLocation>(
  {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
)

const hospitalBannersSchema = new Schema<IHospitalBanners>({
  title: {
    type: String,
  },
  src: {
    type: String,
    required: true,
  },
})

const hospitalSchema = new Schema<IHospital>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    hospitalType: {
      type: String,
      enum: hospitalType,
      required: true,
    },
    specialty: {
      type: String,
    },
    hospitalRegistrationNum: {
      type: String,
      required: true,
    },
    yearsOfEstablishment: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: hospitalLocationSchema,
    },
    hospitalOpenTime: {
      type: String,
    },
    hospitalCloseTime: {
      type: String,
    },
    banners: {
      type: [{ type: hospitalBannersSchema, required: true }],
    },
    logo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Hospital = model<IHospital>('Hospital', hospitalSchema)

export default Hospital
