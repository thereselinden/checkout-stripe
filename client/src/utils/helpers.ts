export const formatPrice = (priceInCents: number): string => {
  // to get price without cents
  const price = Math.floor(priceInCents / 100);

  // to get cents
  let cents: string | number = priceInCents % 100;

  // if cents less than 0 add a 0 to return 2 digits if no cents return without
  cents =
    cents > 0 ? `${price},${cents < 10 ? '0' : ''}${cents}` : price.toString();

  return cents;
};
