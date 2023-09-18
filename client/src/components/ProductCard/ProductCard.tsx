import { IProduct } from '../../interfaces/interfaces';
import { formatPrice } from '../../utils/helpers';
import Button from '../Button/Button';

import './productCard.scss';

type Props = {
  product: IProduct;
  handleAddToCart: (product: IProduct, quantity: number) => void;
};

const ProductCard = ({ product, handleAddToCart }: Props) => {
  return (
    <>
      <article className="card col-6-xs col-4-md col-3-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-img"
        />
        <div className="card-body">
          <div>
            <h4 className="card-title">{product.name}</h4>
            <p>
              {formatPrice(product.default_price.unit_amount)}{' '}
              {product.default_price.currency.toUpperCase()}
            </p>
          </div>
          <Button
            text="Add to cart"
            type="button"
            disabled={false}
            className="btn-secondary"
            onClick={() => handleAddToCart(product, 1)}
          />
        </div>
      </article>
    </>
  );
};

export default ProductCard;
