export const formatBDT = (amount) => {
  let x = Math.abs(amount).toString();
  let [integerPart, fractionalPart] = x.split(".");
  let lastThreeDigits = integerPart.slice(-3);
  let otherDigits = integerPart.slice(0, -3);

  if (otherDigits !== "") {
    lastThreeDigits = "," + lastThreeDigits;
  }

  let formattedInteger =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;

  // Ensure the fractional part is exactly 2 digits
  let formattedFraction = fractionalPart
    ? `.${fractionalPart.padEnd(2, "0")}`
    : ".00";

  // Add a negative sign if the original amount was negative
  return (amount < 0 ? "-" : "") + formattedInteger + formattedFraction;
};
