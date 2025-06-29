import * as yup from "yup";

// Define a schema for validating file inputs (optional, but can be required)
const fileSchema = yup
  .mixed()
  .nullable()
  .test("is-valid-file", "Invalid file type", (value) => {
    if (!value) return true; // Allow null/undefined for optional files
    return value instanceof File
      ? isValidPhoto(value)
      : typeof value === "string";
  })
  .test("file-size", "File size too large", (value) => {
    if (!value || typeof value === "string") return true; // Skip for URLs
    return value instanceof File ? checkFileSize(value) : true;
  });

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  // mobileNumber: yup
  //   .string()
  //   .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid mobile number")
  //   .required("Mobile number is required"),
  address: yup.object().shape({
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string().optional(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    // zipCode: yup
    //   .string()
    //   .matches(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code")
    //   .required("Zip code is required"),
  }),
  name: yup.string().required("Name is required"),
  id: yup.string().optional(),
  personalDetails: yup.object().shape({
    fathersName: yup.string().required("Father's name is required"),
    mothersName: yup.string().required("Mother's name is required"),
    birthDate: yup
      .date()
      .nullable()
      .required("Birth date is required")
      .typeError("Please enter a valid date"),
    nidOrPassportNo: yup
      .string()
      .required("NID or Passport number is required"),
    // nidOrPassportPhoto1: fileSchema.required(
    //   "NID or Passport Photo 1 is required"
    // ),
    // nidOrPassportPhoto2: fileSchema.required(
    //   "NID or Passport Photo 2 is required"
    // ),
    // userPhoto: fileSchema.required("User photo is required"),
  }),
  nomineeDetails: yup.object().shape({
    nomineeFullName: yup.string().required("Nominee full name is required"),
    nomineeRelation: yup.string().required("Nominee relation is required"),
    nomineeFathersName: yup
      .string()
      .required("Nominee father's name is required"),
    nomineeMothersName: yup
      .string()
      .required("Nominee mother's name is required"),
    nomineeBirthDate: yup
      .date()
      .nullable()
      .required("Nominee birth date is required")
      .typeError("Please enter a valid date"),
    nomineeNidOrPassportNo: yup
      .string()
      .required("Nominee NID or Passport number is required"),
    nomineeNidOrPassportPhoto1: fileSchema.required(
      "Nominee NID or Passport Photo 1 is required"
    ),
    nomineeNidOrPassportPhoto2: fileSchema.required(
      "Nominee NID or Passport Photo 2 is required"
    ),
    nomineePhoto: fileSchema.required("Nominee photo is required"),
  }),
  bankInformation: yup.object().shape({
    bankName: yup.string().required("Bank name is required"),
    accountHolderName: yup.string().required("Account holder name is required"),
    accountNumber: yup.string().required("Account number is required"),
    branchName: yup.string().required("Branch name is required"),
  }),
});
