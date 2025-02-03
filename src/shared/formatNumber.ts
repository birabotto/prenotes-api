const formatNumber = (number: string): string => {
  const numString = String(number);
  return numString.padStart(8, "0");
};

export default formatNumber;
