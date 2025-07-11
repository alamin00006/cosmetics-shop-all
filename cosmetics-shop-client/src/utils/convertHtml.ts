import DOMPurify from "dompurify";

export const convertHtml = (text: any) => {
  // Ensure DOMPurify only runs in the browser
  if (typeof window !== "undefined" && DOMPurify.sanitize) {
    return DOMPurify.sanitize(text);
  } else {
    return text;
  }
};
