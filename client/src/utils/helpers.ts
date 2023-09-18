import dayjs from 'dayjs';
import { ICartItem } from '../interfaces/interfaces';

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

export const totalPrice = (items: ICartItem[]): string => {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total += items[i].product.default_price.unit_amount * items[i].quantity;
  }

  return formatPrice(total);
};

export const orderTotalQuantity = (items: ICartItem[]): number => {
  let quantity = 0;

  for (let i = 0; i < items.length; i++) {
    quantity += items[i].quantity;
  }

  return quantity;
};

export const formatDate = (date: number): string => {
  const currentDate = dayjs.unix(date);
  return currentDate.format('YYYY-MM-DD HH:mm');
};
