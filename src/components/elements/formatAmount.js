export const formatAmount = (value) => {
  const rounded = parseFloat(value).toFixed(2); 
  const [integer, decimal] = rounded.split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedInteger}.${decimal}`;
};
