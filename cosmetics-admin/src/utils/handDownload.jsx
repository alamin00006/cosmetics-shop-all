import { saveAs } from "file-saver";

export const handleDownload = (imageUrl, fileName) => {
  saveAs(imageUrl, `${fileName}.jpg`);
};
