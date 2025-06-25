"use client";

import { getErrorMessageByPropertyName } from "@/utils/schemaValidort";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({
  name,
  type = "text",
  size = "small",
  value,
  id,
  placeholder,
  validation,
  label,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  // Map size to DaisyUI input sizes
  const inputSizeClass = size === "large" ? "input-lg" : "input-md";

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={id || name} className="label">
          {required && <span className="text-red-500">*</span>}
          <span className="label-text">{label}</span>
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <input
              type="password"
              className={` ${inputSizeClass} input-bordered w-full`}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              id={id || name}
            />
          ) : (
            <input
              type={type}
              className={`input ${inputSizeClass} input-bordered border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500`}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              id={id || name}
              style={{
                borderColor: "#dddddd",
                outlineColor: "#00c196",
                outlineWidth: "2px",
              }}
            />
          )
        }
      />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default FormInput;
