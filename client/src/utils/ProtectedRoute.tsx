import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCustomerContext } from "../context/CustomerContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useCustomerContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return children;
};

export default ProtectedRoute;
