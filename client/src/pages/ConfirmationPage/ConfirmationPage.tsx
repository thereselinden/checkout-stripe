import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IOrder } from '../../interfaces/interfaces';
import { formatDate, formatPrice } from '../../utils/helpers';
import { useCustomerContext } from '../../context/CustomerContext';

import './confirmationPage.scss';

type Props = {};

const ConfirmationPage = (props: Props) => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [order, setOrder] = useState<IOrder | null>(null);
  const { user } = useCustomerContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyOrder = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const session = {
          sessionId: query,
        };
        const response = await fetch(
          'http://localhost:3000/api/order/verify-order',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(session),
          }
        );

        const data = await response.json();
        console.log('data', data);
        if (!response.ok) {
          setIsLoading(false);
          setErrorMsg(data.message);
        } else {
          setIsPaymentVerified(data.verified);
          setOrder(data.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsPaymentVerified(false);
        setIsLoading(false);
      }
    };
    verifyOrder();
  }, [query]);

  return (
    <>
      {isLoading && <p>Processing order....</p>}
      {errorMsg && <p>{errorMsg}</p>}
      {isPaymentVerified && order && (
        <div className="card confirmation-container">
          <div className="order-information">
            <h3>Thank you for your order!</h3>
            <p>Hi, {user.firstname}</p>
            <p>
              Your order with order number has been confirmed and will be
              shipped soon.
            </p>
          </div>
          <hr />
          <div className="order-details">
            <h4>Order details</h4>
            <p>
              Order number: <span>{order.order_id}</span>
            </p>
            <p>Placed: {formatDate(order.created)}</p>
          </div>
          <hr />
          <h5>Order summary</h5>
          {order &&
            order.products.map(item => (
              <article key={item.product_id} className=" confirmation-card">
                <img src={item.product_image} alt={item.product_name} />
                <div className="order-summary">
                  <p>
                    <span>Product: </span>
                    {item.product_name}
                  </p>
                  <p>
                    <span>Price:</span> {formatPrice(item.price)} SEK
                  </p>
                  <p>
                    <span>Quantity:</span> {item.quantity}
                  </p>
                </div>
              </article>
            ))}
          <hr />
          {order && <h4>Total price: {formatPrice(order.amount_total)} SEK</h4>}
        </div>
      )}
    </>
  );
};

export default ConfirmationPage;
