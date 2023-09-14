import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useCartContext } from '../../context/CartContext';
import { useCustomerContext } from '../../context/CustomerContext';
import { ICartItem } from '../../interfaces/interfaces';
import {
  formatPrice,
  orderTotalQuantity,
  totalPrice,
} from '../../utils/helpers';

import './cartPage.scss';

const CartPage = () => {
  const { isLoggedIn, toggleModal, user } = useCustomerContext();
  const { cartItems, setCartItems } = useCartContext();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const cart = {
      cartItems,
      user: user?.id,
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/checkout/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cart),
        }
      );
      const data = await response.json();
      window.location.replace(data.url);
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    toggleModal();
  };

  const cartQuantity = orderTotalQuantity(cartItems);
  return (
    <>
      <h2>Your cart</h2>
      {cartItems.length > 0 ? (
        <section className="cart-container">
          <div className="row">
            {cartItems.map((item: ICartItem) => (
              <article
                key={item.product.id}
                className="card cart-card col-12-xs col-4-md"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="cart-img"
                />
                <div className="card-body">
                  <h4 className="card-title">{item.product.name}</h4>
                  <p>
                    <span>Quantity:</span> {item.quantity}
                  </p>
                  <p>
                    <span>Price:</span>{' '}
                    {formatPrice(item.product.default_price.unit_amount)}{' '}
                    {item.product.default_price.currency.toUpperCase()}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="order-summary-container col-12-xs">
            <div>
              <h3>Order summary</h3>
              <small>{cartQuantity} products</small>
            </div>
            <hr />
            <p>Total price: {totalPrice(cartItems)} SEK</p>
            <hr />
            <div className="order-action">
              {!isLoggedIn ? (
                <div>
                  <p>Login to place order</p>
                  <Button
                    text="Log in"
                    disabled={false}
                    onClick={handleLogin}
                    className="btn-secondary "
                  />
                </div>
              ) : (
                <Button
                  type="button"
                  text="Go to Checkout"
                  disabled={!isLoggedIn}
                  onClick={handleCheckout}
                  className="btn-secondary"
                />
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          <h3>Nothing here!</h3>
          <Button
            onClick={() => navigate('/')}
            text="Continue shopping"
            disabled={false}
            className="btn-secondary"
          />
        </>
      )}
    </>
  );
};

export default CartPage;
