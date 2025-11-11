import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../../../config/index.js";
const { ObjectId } = mongoose.Schema.Types;

// Schema Design
const adminUserSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "admin", "company", "pr-manager"],
      default: "pr-manager",
      required: true,
    },
    company: {
      type: ObjectId,
      ref: "Company",
      // default: null,
    },
    PRManager: {
      type: ObjectId,
      ref: "PRManager",
    },
    admin: {
      type: ObjectId,
      ref: "Admin",
    },
    SuperAdmin: {
      type: ObjectId,
      ref: "SuperAdmin",
    },
    status: {
      type: String,
      enum: ["Active", "Deactive", "Blocked"],
      default: "Active",
    },
    piHRId: {
      type: String,
      // required: true,
      // unique: true,
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
adminUserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      // const salt = await bcrypt.genSalt(9);
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

// adminUserSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     try {
//       const saltRounds = Number(config.bcrypt_salt_rounds);
//       this.password = await bcrypt.hash(this.password, saltRounds);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

// Method to compare passwords
adminUserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

adminUserSchema.statics.isUserExist = async function (id) {
  return await AdminUser.findOne(
    { _id: id },
    { _id: 1, role: 1, company: 1, email: 1 }
  );
};

// Model
const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
