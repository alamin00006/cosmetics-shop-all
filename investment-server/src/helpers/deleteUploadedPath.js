import fs from "fs";
import path from "path";

export const deleteUserFile = (entity, field, folder, isUser = false) => {
  const target = isUser ? entity?.personalDetails : entity;
  if (target?.[field]) {
    const filePath = path.join(
      process.cwd(),
      "public",
      folder,
      path.basename(target[field])
    );

    // Check if file exists before deleting
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    }
  }
};
