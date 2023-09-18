import Stripe from 'stripe';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  id?: string;
}

export interface IUserWithoutPass {
  firstname: string;
  lastname: string;
  email: string;
  id?: string;
}

export interface ICustomer {
  id: string | Stripe.Customer | Stripe.DeletedCustomer | null;
  name: string | null | undefined;
  email: string | null | undefined;
}

export interface IProduct {
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  discount: number;
  total_price: number;
}
export interface IOrder {
  order_id: string;
  created: number;
  customer: ICustomer;
  products?: IProduct[] | undefined[];
  amount_total: number | null;
}
