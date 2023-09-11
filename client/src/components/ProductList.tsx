import { useEffect, useState } from 'react';
import { ICartItem, IProduct } from '../interfaces/interfaces';
import ProductCard from './ProductCard';

type Props = {};

const ProductList = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  //set defaultvalue from localstorage
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    // check if cart key exist, parse if it does otherwise return empty arr
    const localStorageData = localStorage.getItem('cart');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  const handleAddToCart = (product: IProduct, quantity: number) => {
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

  useEffect(() => {
    // Update localStorage whenever cartItems state changes
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/products/');
        const data = await response.json();
        if (response.ok) {
          setIsLoading(false);
          setProducts(data.data);
          setErrorMsg(null);
        } else {
          setIsLoading(false);
          setErrorMsg(data.message);
        }
      } catch (err) {
        setIsLoading(false);
        console.log((err as Error).message);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {isLoading && <p>Getting products....</p>}
      {errorMsg && <p>{errorMsg}</p>}
      {products &&
        products.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
    </>
  );
};

export default ProductList;
