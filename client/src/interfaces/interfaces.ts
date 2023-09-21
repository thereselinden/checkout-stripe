export interface ICartContext {
  addToCart: (product: IProduct, quantity: number) => void;
  cartItems: ICartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

export interface ICustomerContext {
  login: (formData: ILoginForm) => Promise<void>;
  errorMsg: Error | unknown;
  isLoading: boolean;
  user: IUser | undefined;
  logout: () => Promise<void>;
  toggleModal: () => void;
  isModalOpen: boolean;
}
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

interface ICustomer {
  id: string;
  name: string;
  email: string;
}

export interface IProduct {
  discount: number;
  price: number;
  product_id: string;
  product_image: string;
  product_name: string;
  quantity: number;
  total_price: number;
}

export interface IOrder {
  amount_total: number;
  created: number;
  order_id: string;
  customer: ICustomer;
  products: IProduct[];
  // products: [
  //   {
  //     discount: number;
  //     price: number;
  //     product_id: string;
  //     product_image: string;
  //     product_name: string;
  //     quantity: number;
  //     total_price: number;
  //   }
  // ];
}
