import { useEffect } from "react";
import { IProduct } from "../../interfaces/interfaces";
import ProductCard from "../ProductCard/ProductCard";
import { useCartContext } from "../../context/CartContext";
import CardSkeleton from "../Loader/CardSkeleton";
import useFetch from "../../hooks/useFetch";

const ProductList = () => {
  const url = import.meta.env.VITE_BASE_URL;

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
    fetchData(`${url}/api/products/`, { method: "GET" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
