import { useCallback, useEffect, useState } from "react";
import { IProduct } from "../../interfaces/interfaces";
import ProductCard from "../ProductCard/ProductCard";
import { useCartContext } from "../../context/CartContext";
import CardSkeleton from "../Loader/CardSkeleton";
import useFetch from "../../hooks/useFetch";

const ProductList = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [products, setProducts] = useState<IProduct[] | null>(null);

  const {
    fetchData,
    error: errorMsg,
    isLoading,
    data: products,
  } = useFetch<any>();

  const { addToCart } = useCartContext();

  const handleAddToCart = (product: IProduct, quantity: number) => {
    addToCart(product, quantity);
  };

  useEffect(() => {
    fetchData("http://localhost:3000/api/products/", { method: "GET" });
    // const getProducts = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch("http://localhost:3000/api/products/");
    //     const data = await response.json();

    //     if (response.ok) {
    //       setIsLoading(false);
    //       setProducts(data.data);
    //       setErrorMsg(null);
    //     } else {
    //       setIsLoading(false);
    //       setErrorMsg(data.message);
    //     }
    //   } catch (err) {
    //     setIsLoading(false);
    //     console.log((err as Error).message);
    //   }
    // };
    // getProducts();
  }, []);

  return (
    <section className='row'>
      {isLoading && <CardSkeleton cards={4} />}
      {errorMsg && <p>{errorMsg.toString()}</p>}

      {products &&
        products.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
    </section>
  );
};

export default ProductList;
