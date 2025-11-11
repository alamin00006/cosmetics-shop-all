export const afterSixMonth = (date) => {
  const originalDate = new Date(date);
  const sixMonthsLater = new Date(originalDate);

  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 3);
  return sixMonthsLater;
};
