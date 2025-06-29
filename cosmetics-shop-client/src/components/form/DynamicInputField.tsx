"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../helpers/utils/schemaValidation";
import { HTMLInputTypeAttribute } from "react";
import Label from "./Label";
import { Eye, EyeOff } from "lucide-react";

interface IInput {
  name: string;
  type?: HTMLInputTypeAttribute;
  size?: "large" | "small";
  value?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  validationOptions?: object;
  error?: string;
  accept?: string;
}

const DynamicInputField = ({
  name,
  type = "text",
  size = "large",
  value,
  id,
  placeholder,
  label,
  validationOptions = {},
  error,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <Label htmlFor={label}>{label}</Label>
      <Controller
        control={control}
        name={name}
        rules={validationOptions}
        render={({ field }) => (
          <input
            id={id}
            type={inputType}
            placeholder={placeholder}
            {...field}
            value={field.value ?? ""}
            className={`input focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 w-full placeholder:text-gray-400 focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
              size === "small" ? "h-8 text-sm" : "h-10 text-base"
            } pr-10`} // space for eye icon
          />
        )}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-9 right-2 -translate-y-1/7 transform text-sm text-gray-500 dark:text-white/50"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      )}
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default DynamicInputField;

//  const onSubmit: SubmitHandler<IHospital> = async (data) => {
//     setIsLoading(true);
//     const { banners, logo, ...othersData } = data;

//     try {
//       const imageUrls = await ImageUploader(banners);
//       const hospitalLogo = await ImageUploader(logo);

//       const payload = {
//         ...othersData,
//         logo: hospitalLogo?.[0],
//         banners: imageUrls.map((image) => ({
//           title: "banner",
//           src: image,
//         })),
//       };

//       await axios.post(`${getBaseUrl()}/hospital/create-hospital`, payload);
//       toast.success("We've created your account for you.");
//     } catch (err: any) {
//       console.log(err);
//       toast.error(err.response.data.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

// <ComponentCard title="Hospital Management">
//     <LoadingModal isOpen={isLoading} message="Posting Hospital..." />
//     <div className="mb-4 flex justify-end">
//       <button className="btn btn-primary">List of Hospital</button>
//     </div>
//     <Form submitHandler={onSubmit}>
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <DynamicInputField
//           name="hospitalName"
//           label="Hospital Name"
//           placeholder="Hospital Name"
//           validationOptions={{ required: "Hospital Name is required" }}
//         />
//         <Select
//           name="hospitalType"
//           label="Select Hospital Type"
//           placeholder="Choose an option"
//           options={[
//             { label: "Private", value: "private" },
//             { label: "Government", value: "government" },
//           ]}
//           validationOptions={{ required: "Hospital Type is required" }}
//         />
//         <DynamicInputField
//           name="hospitalRegistrationNum"
//           label="License Number"
//           placeholder="License Number"
//           validationOptions={{ required: "Registration Number is required" }}
//         />
//         <DynamicInputField
//           name="yearsOfEstablishment"
//           label="Years of Establishment"
//           placeholder="Years of Establishment"
//           validationOptions={{
//             required: "Years of Establishment is required",
//           }}
//         />
//         <DynamicInputField
//           name="hospitalMail"
//           label="Email"
//           placeholder="hospital email"
//           validationOptions={{
//             required: "Email is required",
//             pattern: {
//               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//               message: "Invalid email address",
//             },
//           }}
//         />
//         <DynamicInputField
//           name="hospitalContactNumber"
//           label="Phone"
//           placeholder="Phone Number"
//           validationOptions={{
//             required: "Phone number is required",
//             pattern: {
//               value: /^[0-9]{11}$/,
//               message: "Phone number must be 11 digits",
//             },
//           }}
//         />
//       </div>
//       {/* Location */}
//       <SectionTitle>Location</SectionTitle>
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <DynamicInputField
//           name="location.state"
//           label="State"
//           placeholder="State"
//           validationOptions={{
//             required: "State is required",
//           }}
//         />
//         <DynamicInputField
//           name="location.city"
//           label="City"
//           placeholder="City"
//           validationOptions={{
//             required: "City is required",
//           }}
//         />
//         <DynamicInputField
//           name="location.postCode"
//           label="Post Code"
//           placeholder="Post Code"
//           validationOptions={{
//             required: "Post Code is required",
//           }}
//         />
//         <DynamicInputField
//           name="location.address"
//           label="Address"
//           placeholder="Address"
//           validationOptions={{
//             required: "Address is required",
//           }}
//         />

//         <DynamicInputField
//           type="time"
//           name="hospitalOpenTime"
//           label="hospital Open Time"
//           placeholder="hospital Open Time"
//           validationOptions={{ required: "hospital Open Time is required" }}
//         />

//         <DynamicInputField
//           type="time"
//           name="hospitalCloseTime"
//           label="hospital Close Time"
//           placeholder="hospital Close Time"
//           validationOptions={{ required: "hospital Close Time is required" }}
//         />

//         {/* <TimePicker
//           name="hospitalOpenTime"
//           label="Hospital Open Time"
//           placeholder="Select open time"
//           validationOptions={{ required: "Hospital Open Time is required" }}
//           dateFormat="HH:mm"
//         />

//         <TimePicker
//           name="hospitalCloseTime"
//           label="Hospital Close Time"
//           placeholder="Select close time"
//           validationOptions={{ required: "Hospital Close Time is required" }}
//           dateFormat="HH:mm"
//         /> */}
//       </div>
//       {/* Admin Info */}
//       <SectionTitle>Admin (who manages this application)</SectionTitle>
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <DynamicInputField
//           name="userName"
//           label="Management Name"
//           placeholder="Management Name"
//           validationOptions={{ required: "Management Name is required" }}
//         />
//         <DynamicInputField
//           name="contactNumber"
//           label="Contact Number"
//           placeholder="Contact Number"
//           validationOptions={{
//             required: "Contact Number is required",
//             pattern: {
//               value: /^[0-9]{11}$/,
//               message: "Contact number must be 11 digits",
//             },
//           }}
//         />
//         <DynamicInputField
//           name="email"
//           label="Email"
//           placeholder="Email"
//           validationOptions={{
//             required: "Email is required",
//             pattern: {
//               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//               message: "Invalid email address",
//             },
//           }}
//         />

//         <DynamicInputField
//           name="password"
//           label="Password"
//           placeholder="Password"
//           type="password"
//           validationOptions={{
//             required: "Password is required",
//             minLength: {
//               value: 6,
//               message: "Password must be at least 6 characters",
//             },
//           }}
//         />
//         <FileUploadInput
//           name="logo"
//           label="Upload Logo"
//           size="large"
//           accept="image/*"
//           multiple={false}
//           validationOptions={{
//             required: "At least one image is required",
//           }}
//         />
//         <FileUploadInput
//           name="banners"
//           label="Upload Banner"
//           size="large"
//           accept="image/*"
//           multiple={true}
//           validationOptions={{
//             required: "At least one image is required",
//           }}
//         />
//       </div>
//       <div className="mt-6 flex justify-end">
//         <button type="submit" className="btn btn-primary hover:bg-black">
//           Add Hospital
//         </button>
//       </div>
//     </Form>
//   </ComponentCard>
