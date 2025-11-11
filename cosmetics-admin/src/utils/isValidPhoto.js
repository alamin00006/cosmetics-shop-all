export const isValidPhoto = (file) => {
  const validExtensions = ["png", "jpeg", "jpg", "webp"];
  const fileExtension = file.type.split("/")[1].toLowerCase();
  return validExtensions.includes(fileExtension);
};
