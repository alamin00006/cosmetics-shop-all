export const characterLimit = (text, charLimit) => {
  return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
};
