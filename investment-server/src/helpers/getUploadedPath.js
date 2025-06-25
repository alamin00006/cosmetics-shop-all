export const getUploadedFilePath = (files, entity, field, isUser = false) => {
  //   const target = isUser ? entity?.personalDetails : entity;
  return files?.[field]?.length ? files[field][0]?.path : "";
};
