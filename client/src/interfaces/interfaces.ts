export interface IRegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
}

export interface IProduct {
  id: string;
  images: string[];
  name: string;
  description: string;
  default_price: {
    currency: string;
    unit_amount: number;
  };
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
