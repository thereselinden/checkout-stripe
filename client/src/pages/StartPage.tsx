import { useCustomerContext } from '../context/CustomerContext';

type Props = {};

const StartPage = (props: Props) => {
  const { user, isLoggedIn } = useCustomerContext();

  return (
    <div>
      <h1>StartPage</h1>
      {isLoggedIn && (
        <>
          <p>Hello {user.firstname}</p>
        </>
      )}
    </div>
  );
};

export default StartPage;
