export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = String(date.getFullYear()).slice(-2);

  return `${day} ${month} ${year}`;
};

export const formattedTime = (dateString) => {
  return new Date(dateString)?.toLocaleString()?.split(",")[1];
};
