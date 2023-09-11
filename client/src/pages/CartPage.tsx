import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useCartContext } from '../context/CartContext';
import { useCustomerContext } from '../context/CustomerContext';
import { ICartItem } from '../interfaces/interfaces';
import { formatPrice, totalPrice } from '../utils/helpers';
type Props = {};

const CartPage = (props: Props) => {
  const { isLoggedIn, toggleModal } = useCustomerContext();
  const { cartItems } = useCartContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log('checkout button clicked');
  };

  const handleLogin = () => {
    toggleModal();
  };
  return (
    <>
      <h1>Your cart</h1>
      {cartItems.length > 0 ? (
        <section>
          {cartItems.map((item: ICartItem) => (
            <article key={item.product.id}>
              <img src={item.product.images[0]} alt={item.product.name} />
              <div>
                <h4>{item.product.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Price: {formatPrice(item.product.default_price.unit_amount)}{' '}
                  {item.product.default_price.currency.toUpperCase()}
                </p>
              </div>
            </article>
          ))}
          <p>Total price: {totalPrice(cartItems)} SEK</p>
        </section>
      ) : (
        <Button
          onClick={() => navigate('/')}
          text="Continue shopping"
          disabled={false}
        />
      )}
      {!isLoggedIn ? (
        <section>
          <p>Login to place order</p>
          <Button text="Log in" disabled={false} onClick={handleLogin} />
        </section>
      ) : (
        <Button
          type="button"
          text="Go to Checkout"
          disabled={!isLoggedIn}
          onClick={handleCheckout}
        />
      )}
    </>
  );
};

export default CartPage;
