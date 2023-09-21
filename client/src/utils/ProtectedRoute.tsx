import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useCustomerContext } from "../context/CustomerContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useCustomerContext();

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
