import { Controller, useFormContext } from "react-hook-form";
import Label from "./Label";

type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  placeholder?: string;
  label?: string;
  handleChange?: (el: string) => void;
  className?: string;
  validationOptions?: object;
};

const Select = ({
  name,
  placeholder = "Select",
  options,
  label,
  handleChange,
  className = "",
  validationOptions = {},
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        name={name}
        rules={validationOptions}
        render={({ field: { value, onChange } }) => (
          <div>
            <select
              className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
                value
                  ? "text-gray-800 dark:text-white/90"
                  : "text-gray-400 dark:text-gray-400"
              } ${error ? "border-red-500" : ""} ${className}`}
              value={value || ""}
              onChange={(e) => {
                onChange(e.target.value);
                handleChange?.(e.target.value);
              }}
            >
              <option
                value=""
                disabled
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {placeholder}
              </option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default Select;
