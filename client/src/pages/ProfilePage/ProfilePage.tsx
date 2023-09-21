import { useEffect, useRef, useState } from "react";
import {
  formatDate,
  formatPrice,
  orderTotalQuantity,
} from "../../utils/helpers";
import { useCustomerContext } from "../../context/CustomerContext";
import Skeleton from "react-loading-skeleton";
import OrderSkeleton from "../../components/Loader/OrderSkeleton";
import { IOrder } from "../../interfaces/interfaces";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const { user } = useCustomerContext();

  const firstMount = useRef(true);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const response = await fetch("http://localhost:3000/api/orders", {
          credentials: "include",
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
      } catch (err) {
        setIsLoading(false);
      }
    };

    if (firstMount.current) {
      getOrders();
      firstMount.current = false;
    }
  }, []);

  return (
    <>
      {isLoading && <OrderSkeleton />}
      {errorMsg && <p>{errorMsg}</p>}

      {orders && user ? (
        <>
          <h2>Orders</h2>
          <h3>Hi, {user.firstname}</h3>

          {orders.map((order) => (
            <section key={order.order_id} className='list'>
              <div>
                <p>{formatDate(order.created)}</p>
                <small>{orderTotalQuantity(order.products)}</small>
              </div>
              <p>{formatPrice(order.amount_total)} SEK</p>
            </section>
          ))}
        </>
      ) : (
        <>
          <h2>{isLoading ? <Skeleton /> : "Orders"}</h2>
          <p>
            {" "}
            {isLoading ? <Skeleton /> : " No orders here to be displayed!"}
          </p>
        </>
      )}
    </>
  );
};

export default ProfilePage;
