import { Controller, useFormContext } from "react-hook-form";
import Label from "./Label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

type DatePickerFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  validationOptions?: object;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  timeIntervals?: number;
  dateFormat?: string;
};

const TimePicker = ({
  name,
  label,
  placeholder = "Select time",
  className = "",
  validationOptions = {},
  showTimeSelect = true,
  showTimeSelectOnly = true,
  timeIntervals = 15,
  dateFormat = "h:mm aa", // 12-hour format with AM/PM
}: DatePickerFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  // Helper function to parse 12-hour time string to Date
  const parseTimeString = (timeStr: string | null | undefined): Date | null => {
    if (!timeStr || typeof timeStr !== "string") return null;

    // Match formats like "8:00 AM", "08:00 AM", "8:00:00 AM"
    const timeMatch = timeStr.match(
      /^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/i,
    );
    if (!timeMatch) return null;

    let [, hours, minutes, period] = timeMatch;
    let hoursNum = parseInt(hours, 10);
    const minutesNum = parseInt(minutes, 10);
    period = period.toUpperCase();

    // Convert 12-hour to 24-hour for Date
    if (period === "PM" && hoursNum !== 12) {
      hoursNum += 12;
    } else if (period === "AM" && hoursNum === 12) {
      hoursNum = 0;
    }

    // Create Date with dummy date (1970-01-01)
    const date = new Date(1970, 0, 1, hoursNum, minutesNum, 0);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <div className="w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        name={name}
        rules={validationOptions}
        render={({ field: { value, onChange } }) => (
          <div>
            <DatePicker
              selected={parseTimeString(value)}
              onChange={(date: Date | null) =>
                onChange(
                  date
                    ? date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : null,
                )
              }
              showTimeSelect={showTimeSelect}
              showTimeSelectOnly={showTimeSelectOnly}
              timeIntervals={timeIntervals}
              dateFormat={dateFormat}
              placeholderText={placeholder}
              popperPlacement="bottom-start"
              className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 appearance-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-none sm:w-full md:w-[700px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
                value
                  ? "text-gray-800 dark:text-white/90"
                  : "text-gray-400 dark:text-gray-400"
              } ${error ? "border-red-500" : ""} ${className}`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default TimePicker;

// import { Controller, useFormContext } from "react-hook-form";
// import Label from "./Label";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

// type DatePickerFieldProps = {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   validationOptions?: object;
//   showTimeSelect?: boolean;
//   showTimeSelectOnly?: boolean;
//   timeIntervals?: number;
//   dateFormat?: string;
// };

// const TimePicker = ({
//   name,
//   label,
//   placeholder = "Select time",
//   className = "",
//   validationOptions = {},
//   showTimeSelect = true,
//   showTimeSelectOnly = true,
//   timeIntervals = 15,
//   dateFormat = "h:mm aa",
// }: DatePickerFieldProps) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const error = errors[name]?.message as string | undefined;

//   return (
//     <div className="w-full">
//       {label && <Label htmlFor={name}>{label}</Label>}
//       <Controller
//         control={control}
//         name={name}
//         rules={validationOptions}
//         render={({ field: { value, onChange } }) => (
//           <div>
//             <DatePicker
//               selected={value ? new Date(value) : null}
//               onChange={(date: Date | null) =>
//                 onChange(date ? date.toISOString() : null)
//               }
//               showTimeSelect={showTimeSelect}
//               showTimeSelectOnly={showTimeSelectOnly}
//               timeIntervals={timeIntervals}
//               dateFormat={dateFormat}
//               placeholderText={placeholder}
//               popperPlacement="bottom-start"
//               className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 appearance-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-none sm:w-full md:w-[700px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
//                 value
//                   ? "text-gray-800 dark:text-white/90"
//                   : "text-gray-400 dark:text-gray-400"
//               } ${error ? "border-red-500" : ""} ${className}`}
//             />
//             {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default TimePicker;
