export const formatNumber = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1).replace(/\.0$/, "") + "CR"; // Convert to crores (CR)
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Convert to millions (M)
  }

  // else if (num >= 100000) {
  //   return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L";
  //   // Convert to lakhs (L)
  // }
  else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // Convert to thousands (k)
  }
  return num;
};
