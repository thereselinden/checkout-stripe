import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/interfaces';
import ProductCard from './ProductCard';

type Props = {};

const ProductList = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);

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
          <ProductCard key={product.id} product={product} />
        ))}
    </>
  );
};

export default ProductList;