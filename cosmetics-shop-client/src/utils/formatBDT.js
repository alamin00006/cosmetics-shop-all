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

// export const formatBDT = (amount) => {
//   let x = amount.toString();
//   let lastThreeDigits = x.slice(-3);
//   let otherDigits = x.slice(0, -3);
//   if (otherDigits !== "") {
//     lastThreeDigits = "," + lastThreeDigits;
//   }
//   return (
//     otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits + ".00"
//   );
// };

// export const formatBDT = (amount) => {
//   if (typeof amount !== "number") {
//     throw new Error("Amount must be a number");
//   }

//   // Ensure the number has two decimal places
//   const fixedAmount = amount.toFixed(2);

//   // Split into integer and decimal parts
//   const [integerPart, decimalPart] = fixedAmount.split(".");

//   // Format the integer part for BDT
//   const formattedInteger = integerPart
//     .replace(/\B(?=(\d{2})+(?!\d))/g, ",") // Add commas for groups of two
//     .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); // Ensure commas for groups of three

//   // Combine formatted integer and decimal parts
//   return `${formattedInteger}.${decimalPart}`;
// };
