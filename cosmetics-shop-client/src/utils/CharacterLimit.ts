export const characterLimit = (text: string, charLimit: number): string => {
  return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
};
