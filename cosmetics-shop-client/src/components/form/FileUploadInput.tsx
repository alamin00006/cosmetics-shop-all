/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../helpers/utils/schemaValidation";
import { useState, useEffect, useRef } from "react";
import Label from "./Label";
import { X } from "lucide-react";
import Image from "next/image";

interface IFileInput {
  name: string;
  size?: "large" | "small";
  id?: string;
  label?: string;
  accept?: string;
  validationOptions?: object;
  multiple?: boolean;
}

const FileUploadInput = ({
  name,
  size = "large",
  id,
  label,
  accept = "image/*",
  validationOptions = {},
  multiple = true,
}: IFileInput) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          url: URL.createObjectURL(file),
          file,
        }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      // Update form value with all files
      setValue(
        name,
        multiple ? [...previews.map((p) => p.file), ...newFiles] : newFiles,
        { shouldValidate: true },
      );
    }
  };

  const handleRemoveImage = (index: number) => {
    const previewToRemove = previews[index];
    URL.revokeObjectURL(previewToRemove.url);

    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);

    // Update form value
    setValue(name, multiple ? updatedPreviews.map((p) => p.file) : [], {
      shouldValidate: true,
    });
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files);
    }
  };

  return (
    <div className="w-full">
      {label && <Label htmlFor={id || name}>{label}</Label>}
      <div
        ref={dropRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-4 transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <Controller
          control={control}
          name={name}
          rules={validationOptions}
          render={({ field: { ref } }) => (
            <input
              id={id || name}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => handleFileChange(e.target.files)}
              ref={ref}
              className={`block w-full cursor-pointer text-sm text-gray-900 focus:outline-none ${
                size === "small" ? "p-1.5" : "p-2.5"
              } ${isDragging ? "opacity-50" : "opacity-100"}`}
            />
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p
            className={`text-gray-500 dark:text-gray-400 ${
              isDragging ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            Drop images here
          </p>
        </div>
      </div>
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <Image
                src={preview.url}
                alt={`Preview ${index + 1}`}
                className="h-auto max-w-full rounded-lg object-cover shadow-md"
                style={{ maxHeight: size === "small" ? "150px" : "200px" }}
                width={200}
                height={200}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
