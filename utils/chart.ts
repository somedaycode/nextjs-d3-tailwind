export const fillCircleByValue = (value: number) => {
  if (value === 0) return '#7DE5F5D1';

  if (value === 1) return '#89D3C7D1';

  return '#31ACA9D1';
};

export const weighValueByMutiply = (value: number, mutiply = 30) =>
  Math.abs(value - 3) * mutiply;
