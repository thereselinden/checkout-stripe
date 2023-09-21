import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IOrder } from "../../interfaces/interfaces";
import { formatDate, formatPrice } from "../../utils/helpers";
import { useCustomerContext } from "../../context/CustomerContext";
import { useCartContext } from "../../context/CartContext";

import "./confirmationPage.scss";
import ConfirmationSkeleton from "../../components/Loader/ConfirmationSkeleton";
import useFetch from "../../hooks/useFetch";

const ConfirmationPage = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);
  const { user } = useCustomerContext();
  const { setCartItems } = useCartContext();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("session_id");
  const { fetchData, isLoading, error: errorMsg } = useFetch<IOrder[]>();

  const firstMount = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) navigate("/");

    const verifyOrder = async () => {
      const session = {
        sessionId: query,
      };

      const result = await fetchData(
        "http://localhost:3000/api/order/verify-order",
        {
          method: "POST",
          body: session,
        }
      );
      setOrder(result?.data.data);
      setIsPaymentVerified(result?.data.verified);
      setCartItems([]);
    };

    if (firstMount.current) {
      verifyOrder();
      firstMount.current = false;
    }
  }, [query, navigate, setCartItems, fetchData]);

  return (
    <>
      {isLoading && <ConfirmationSkeleton />}
      {errorMsg && <p>{errorMsg.toString()}</p>}
      {isPaymentVerified && order && user && (
        <div className='card confirmation-container'>
          <div className='order-information'>
            <h3>Thank you for your order!</h3>
            <p>Hi, {user.firstname}</p>
            <p>Your order has been confirmed and will be shipped soon.</p>
          </div>
          <hr />
          <div className='order-details'>
            <h4>Order details</h4>
            <p>
              Order number: <span>{order.order_id}</span>
            </p>
            <p>Placed: {formatDate(order.created)}</p>
          </div>
          <hr />
          <h5>Order summary</h5>
          {order &&
            order.products.map((item) => (
              <article key={item.product_id} className=' confirmation-card'>
                <img src={item.product_image} alt={item.product_name} />
                <div className='order-summary'>
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
