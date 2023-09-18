import { PropsWithChildren, createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ICartContext, ICartItem, IProduct } from '../interfaces/interfaces';

export const CartContext = createContext<ICartContext>(null as any);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>('cart', []);

  const addToCart = (product: IProduct, quantity: number) => {
    // check if product is in cart
    const inCartIndex = cartItems.findIndex(
      item => product.id === item.product.id
    );

    // if product in cart increase quantity
    if (inCartIndex !== -1) {
      const updateCartItems = [...cartItems];
      updateCartItems[inCartIndex].quantity += quantity;
      setCartItems(updateCartItems);
    } else {
      const cartItem: ICartItem = { product, quantity };
      setCartItems(prevCartItems => [...prevCartItems, cartItem]);
    }
  };

  return (
    <CartContext.Provider value={{ addToCart, cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
