export const roundToNearest = (value: number, entryFee: number) => {
  return Math.round(value / entryFee) * entryFee;
};
