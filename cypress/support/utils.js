export const createArrInRange = (range, minVal = 0) => {
  let arrayInRange = [];

  for (let i = minVal; i <= range; i++) arrayInRange.push(i);
  return arrayInRange;
};