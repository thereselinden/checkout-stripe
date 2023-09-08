import ProductList from '../components/ProductList';
import { useCustomerContext } from '../context/CustomerContext';

type Props = {};

const StartPage = (props: Props) => {
  const { user, isLoggedIn } = useCustomerContext();

  return (
    <div>
      <h1>StartPage</h1>
      <ProductList />
      {isLoggedIn && (
        <>
          <p>Hello {user.firstname}</p>
        </>
      )}
    </div>
  );
};

export default StartPage;
