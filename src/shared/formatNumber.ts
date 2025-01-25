const formatNumber = (number: any): string => {
  const numString = String(number);

  if (numString.length === 8) {
    return numString;
  } else if (numString.length === 7) {
    return "0" + numString;
  } else if (numString.length === 6) {
    return "00" + numString;
  }

  return String(number);
};

export default formatNumber;
