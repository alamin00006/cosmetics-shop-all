import imageCompression from "browser-image-compression";

export const compressImage = async (file, options = {}) => {
  let maxSizeMB = options.maxSizeMB || 0.1;
  let maxWidthOrHeight = options.maxWidthOrHeight || 1280;
  const defaultOptions = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
    fileType: file.type,
    ...options,
  };

  try {
    const compressedBlob = await imageCompression(file, defaultOptions);
    // Create a new File object and explicitly set the name to preserve it
    const compressedFile = new File([compressedBlob], file.name, {
      type: compressedBlob.type,
      lastModified: new Date(),
    });
    return compressedFile;
  } catch (error) {
    throw error;
  }
};
