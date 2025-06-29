"use client";

import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../helpers/utils/schemaValidation";
import Label from "./Label";

interface ITextArea {
  name: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  label?: string;
  validationOptions?: object;
  error?: string;
}

const DynamicTextArea = ({
  name,
  rows = 4,
  cols = 50,
  placeholder,
  label,
  validationOptions = {},
}: ITextArea) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="w-full">
      <Label htmlFor={label}>{label}</Label>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={validationOptions}
        render={({ field }) => (
          <textarea
            id={name}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            {...field}
            className="textarea focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 w-full placeholder:text-gray-400 focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
        )}
      />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default DynamicTextArea;
