import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useCustomerContext } from '../context/CustomerContext';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useCustomerContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
