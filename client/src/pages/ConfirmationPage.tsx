import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IOrder } from '../interfaces/interfaces';
import { formatPrice } from '../utils/helpers';

type Props = {};

const ConfirmationPage = (props: Props) => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [order, setOrder] = useState<IOrder | null>(null);
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
      {isPaymentVerified && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>
              Order confirmation{' '}
              <span style={{ fontSize: 8 }}>{order?.order_id}</span>
            </h3>

            {order &&
              order.products.map(item => (
                <article
                  key={item.product_id}
                  style={{ display: 'flex', gap: 5 }}
                >
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    style={{ width: 40 }}
                  />
                  <div style={{ display: 'flex', gap: 5 }}>
                    <p>{item.product_name}</p>
                    <p>Price: {formatPrice(item.price)} SEK</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </article>
              ))}
            {order && (
              <h4>Total price: {formatPrice(order.amount_total)} SEK</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmationPage;
