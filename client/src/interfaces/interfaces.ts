export interface ICartContext {
  addToCart: (product: IProduct, quantity: number) => void;
  cartItems: ICartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

export interface ICustomerContext {
  // login: (credentials: ILoginForm) => Promise<void>;
  login: (formData: ILoginForm) => Promise<void>;
  // isLoggedIn: boolean;
  // errorMsg: string | null;
  errorMsg: Error | unknown;
  isLoading: boolean;
  //user: IUser | null;
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

export interface IOrder {
  order_id: string;
  created: number;
  customer: ICustomer;
  products: [
    {
      product_id: string;
      product_name: string;
      product_image: string;
      price: number;
      quantity: number;
      discount: number;
      total_price: number;
    }
  ];
  amount_total: number;
}
