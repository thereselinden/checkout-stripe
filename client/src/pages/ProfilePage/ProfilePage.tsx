import { useEffect, useState } from 'react';

type Props = {};

const ProfilePage = (props: Props) => {
  const [orders, setOrders] = useState(null);
  console.log('orders', orders);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/orders', {
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
          console.log('det gkci inte bra');
        } else {
          setOrders(data.orders);
        }
        console.log('data', data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return <div>ProfilePage</div>;
};

export default ProfilePage;
