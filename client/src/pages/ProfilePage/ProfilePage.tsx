import { useEffect, useState } from 'react';
import {
  formatDate,
  formatPrice,
  orderTotalQuantity,
} from '../../utils/helpers';
import { useCustomerContext } from '../../context/CustomerContext';

type Props = {};

const ProfilePage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[] | null>(null);
  const { user } = useCustomerContext();

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const response = await fetch('http://localhost:3000/api/orders', {
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
          setErrorMsg(data.message);
          setIsLoading(false);
        } else {
          setOrders(data.orders);
          setIsLoading(false);
          setErrorMsg(null);
        }
        console.log('data', data);
      } catch (err) {
        console.log(err);

        setIsLoading(false);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      {isLoading && <p>Getting orders....</p>}
      {errorMsg && <p>{errorMsg}</p>}

      {orders && user ? (
        <>
          <h2>Orders</h2>
          <h3>Hi, {user.firstname}</h3>

          {orders.map(order => (
            <section key={order.order_id} className="list">
              <div>
                <p>{formatDate(order.created)}</p>
                <small>{orderTotalQuantity(order.products)} product(s)</small>
              </div>
              <p>{formatPrice(order.amount_total)} SEK</p>
            </section>
          ))}
        </>
      ) : (
        <>
          <h2>Orders</h2>
          <p>No orders here to be displayed!</p>
        </>
      )}
    </>
  );
};

export default ProfilePage;
