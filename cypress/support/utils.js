export const createNumArrInRange = (range, minVal = 1) => {
  /**
   * Create a numerical array with using the range param
   * as an inclusive delimitator.
   */
  let arrayInRange = [];

  for (let i = minVal; i <= range; i++) arrayInRange.push(i);
  return arrayInRange;
};

export const sortAscending = function (a, b) {
  /**
   * Function to pass as param to array.sort.
   */
  return a - b;
};

export const sortDescending = function (a, b) {
  /**
   * Function to pass as param to array.sort.
   */
  return b - a;
};

export const getNumValuesFromPricesArr = (priceArr) => {
  /**
   * Returns an array of numerical values from an array of
   * string prices: ["$5.99", "$14.99"] => [5.99, 14.99].
   */
  let numValues = [];
  for (const itemValueStr of priceArr) {
    const cleanedItemValueStr = itemValueStr.replace("$", "");
    const itemNum = Number(cleanedItemValueStr);
    numValues.push(itemNum);
  }
  return numValues;
};
