import multer from "multer";
import sanitizeFilename from "sanitize-filename";
import User from "../app/modules/user/user.model.js";
import ApiError from "../error/ApiError.js";
import httpStatus from "http-status";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "public/uploads";
    switch (true) {
      case file.fieldname.startsWith("nidOrPassportPhoto"):
      case file.fieldname.startsWith("nidOrPassportBackSidePhoto"):
        folder = "public/users-nid";
        break;
      case file.fieldname.startsWith("userPhoto"):
        folder = "public/user-photo";
        break;
      case file.fieldname.startsWith("nomineeNidOrPassportPhoto"):
      case file.fieldname.startsWith("nomineeNidOrPassportBackSidePhoto"):
        folder = "public/nominees-nid";
        break;
      case file.fieldname.startsWith("nomineePhoto"):
        folder = "public/nominees-photo";
        break;
      case file.fieldname.startsWith("proofOfPaymentPhoto"):
        folder = "public/payment-photo";
        break;
    }
    cb(null, folder);
  },
  filename: async (req, file, cb) => {
    try {
      if (!req.params) {
        return cb(
          new ApiError(httpStatus.BAD_REQUEST, "Missing request parameters"),
          null
        );
      }

      const { userId, id: investId } = req.params;

      const user = await User.findOne({ _id: userId }).select(
        "id isVerified name phoneNumber"
      );
      if (!user) {
        return cb(new ApiError(httpStatus.NOT_FOUND, "User not found"), null);
      }
      const identity = investId || user.id;

      if (user.isVerified) {
        return cb(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "You have already updated your data"
          ),
          null
        );
      }

      fileMake(user, identity, cb, file); // Pass null for investId if not applicable
    } catch (error) {
      cb(
        new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          `Server error: ${error.message}`
        ),
        null
      );
    }
  },
});

const fileMake = (user, identity, cb, file) => {
  const userName = user.name.replace(/\s+/g, "-");
  const userPhone = user?.phoneNumber?.slice(-3) || "000";
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const uniqueSuffix = identity
    ? `${userName}-${identity}-${userPhone}-${timestamp}`
    : `${userName}-${userPhone}-${timestamp}`;
  const sanitizedOriginalName = sanitizeFilename(file.originalname);
  cb(null, `${uniqueSuffix}-${sanitizedOriginalName}`);
};

// const fileMake = (user, investId, cb, file) => {
//   const userName = user.name.replace(/\s+/g, "-");
//   const userPhone = user?.phoneNumber?.slice(-3) || "000"; // More meaningful fallback
//   const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
//   const uniqueSuffix = investId
//     ? `${userName}-${investId}-${userPhone}-${timestamp}`
//     : `${userName}-${userPhone}-${timestamp}`; // Exclude investId if not applicable
//   cb(null, `${uniqueSuffix}-${file.originalname}`);
// };

const uploader = multer({
  storage,
  // limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const supportedMimeTypes =
      /image\/png|image\/jpeg|image\/webp|application\/pdf/i;
    if (supportedMimeTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          httpStatus.BAD_REQUEST,
          "Only PNG, JPEG, WEBP, and PDF formats are allowed"
        ),
        null
      );
    }
  },
});

const imageUploader = uploader.fields([
  { name: "nidOrPassportPhoto", maxCount: 1 },
  { name: "nidOrPassportBackSidePhoto", maxCount: 1 },
  { name: "userPhoto", maxCount: 1 },
  { name: "nomineeNidOrPassportPhoto", maxCount: 1 },
  { name: "nomineeNidOrPassportBackSidePhoto", maxCount: 1 },
  { name: "nomineePhoto", maxCount: 1 },
  { name: "proofOfPaymentPhoto", maxCount: 1 },
]);

export default imageUploader;

// import multer from "multer";
// import mime from "mime-types";
// import User from "../app/modules/user/user.model.js";
// import Investment from "../app/modules/investment/investment.model.js";
// import ApiError from "../error/ApiError.js";
// import httpStatus from "http-status";
// import { INVESTMENT_STATUS } from "../constant/investmentStatus.js";
// // import Nominee from "../app/modules/nominee/nominee.model.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let folder = "public/uploads";
//     switch (true) {
//       case file.fieldname.startsWith("nidOrPassportPhoto"):
//       case file.fieldname.startsWith("nidOrPassportBackSidePhoto"):
//         folder = "public/users-nid";
//         break;
//       case file.fieldname.startsWith("userPhoto"):
//         folder = "public/user-photo";
//         break;
//       case file.fieldname.startsWith("nomineeNidOrPassportPhoto"):
//       case file.fieldname.startsWith("nomineeNidOrPassportBackSidePhoto"):
//         folder = "public/nominees-nid";
//         break;
//       case file.fieldname.startsWith("nomineePhoto"):
//         folder = "public/nominees-photo";
//         break;
//       case file.fieldname.startsWith("proofOfPaymentPhoto"):
//         folder = "public/payment-photo";
//         break;
//     }
//     cb(null, folder);
//   },
//   filename: async (req, file, cb) => {
//     const userId = req.params.userId;
//     const investId = req?.params?.id;

//     if (!user) {
//       cb(new Error("User not found"), null);
//       return;
//     }

//     const user = await User.findOne({ _id: userId });

//     if (file.fieldname.startsWith("proofOfPaymentPhoto" && investId)) {
//       const investment = await Investment.findOne({ _id: investId }).select(
//         "status"
//       );
//       if (investment.status === INVESTMENT_STATUS.APPROVED) {
//         cb(
//           new ApiError(
//             httpStatus.BAD_REQUEST,
//             "Sorry, your investment is already APPROVED"
//           ),
//           null
//         );
//         return;
//       } else {
//         fileMake(user, investId, cb, file);
//       }
//     } else {
//       if (user?.isVerified === true) {
//         cb(new Error("Sorry, you have already updated your data."), null);
//         return;
//       } else {
//         fileMake(user, investId, cb, file);
//       }
//     }

//     // Check for existing nominees for this user
//     // const existingNominees = await Nominee.find({ user: userId });

//     // if (existingNominees.length >= 2) {
//     //   cb(new Error("Sorry! You cannot add more than two nominee"), null);
//     //   return;
//     // }
//   },
// });

// const fileMake = (user, investId, cb, file) => {
//   const userName = user.name.replace(/\s+/g, "-");

//   // Last 3 digit
//   const userPhone = user?.phoneNumber?.slice(-3) || "0";
//   const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
//   const uniqueSuffix = `${userName}-${investId}-${userPhone}-${timestamp}`;
//   cb(null, uniqueSuffix + "-" + file.originalname);
// };

// const uploader = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const supportedImage = /png|jpg|pdf|jpeg|webp/i;
//     const mimeType = mime.lookup(file.originalname);
//     if (supportedImage.test(mimeType)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PNG, JPG, JPEG, PDF, and WEBP formats are allowed!"));
//     }
//   },
// });

// const imageUploader = uploader.fields([
//   { name: "nidOrPassportPhoto", maxCount: 1 },
//   { name: "nidOrPassportBackSidePhoto", maxCount: 1 },
//   { name: "userPhoto", maxCount: 1 },
//   { name: "nomineeNidOrPassportPhoto", maxCount: 1 },
//   { name: "nomineeNidOrPassportBackSidePhoto", maxCount: 1 },
//   { name: "nomineePhoto", maxCount: 1 },
//   { name: "proofOfPaymentPhoto", maxCount: 1 },
// ]);

// export default imageUploader;
