export const afterOneYear = (date) => {
  const originalDate = new Date(date);
  const oneYearLater = new Date(originalDate);
  // Add one year
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  return oneYearLater;
};
