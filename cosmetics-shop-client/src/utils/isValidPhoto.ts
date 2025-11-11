export const isValidPhoto = (file: File) => {
  const validExtensions = [
    "png",
    "jpeg",
    "jpg",
    "PNG",
    "JPG",
    "jpeg",
    "JPEG",
    "webp",
  ];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};
