import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import config from "../../../config/index.js";

// Schema Design
const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      // required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email already exists!"],
      validate: [validator.isEmail, "Provide a valid email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
    },
    role: {
      type: String,
      enum: ["User"],
      default: "User",
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiration: {
      type: Date,
      required: false,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Personal Information
    personalDetails: {
      fathersName: {
        type: String,
      },
      mothersName: {
        type: String,
      },
      birthDate: {
        type: Date,
      },
      nidOrPassportNo: {
        type: String,
      },
      nidOrPassportPhoto: {
        type: String,
      },
      nidOrPassportBackSidePhoto: {
        type: String,
      },
      userPhoto: {
        type: String,
      },
    },

    // Address Information
    address: {
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
        default: "Bangladesh",
      },
    },
    status: {
      type: String,
      enum: ["active", "deactive", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
      );
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.isUserExist = async function (id) {
  return await User.findOne({ _id: id });
  // return await User.findOne({ _id: id }, { id: 1, password: 1, role: 1 });
};

// Model
const User = mongoose.model("User", userSchema);

export default User;
