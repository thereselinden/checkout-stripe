import { useEffect, useState } from 'react';
import { ICartItem, IProduct } from '../interfaces/interfaces';
import { formatPrice } from '../utils/helpers';
import Button from './Button';

type Props = {
  product: IProduct;
  handleAddToCart: (product: IProduct, quantity: number) => void;
};

const ProductCard = ({ product, handleAddToCart }: Props) => {
  return (
    <>
      <article>
        <img src={product.images[0]} alt={product.name} />
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>
          {formatPrice(product.default_price.unit_amount)}{' '}
          {product.default_price.currency.toUpperCase()}
        </p>
        <Button
          text="Add to cart"
          type="button"
          disabled={false}
          onClick={() => handleAddToCart(product, 1)}
        />
      </article>
    </>
  );
};

export default ProductCard;
