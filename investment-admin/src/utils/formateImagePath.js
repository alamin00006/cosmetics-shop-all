import { getMainBaseUrl } from "@/helpers/config/envConfig";

export function formatImagePath(filePath) {
  // Replace backslashes with forward slashes
  let formattedPath = filePath.replace(/\\/g, "/");

  formattedPath = formattedPath.replace(/^public\//, "");

  const baseURL = getMainBaseUrl();
  // Combine the base URL and the formatted path
  const fullURL = `${baseURL}/${formattedPath}`;

  return fullURL;
}
