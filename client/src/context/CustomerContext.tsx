import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { ICustomerContext, ILoginForm, IUser } from "../interfaces/interfaces";
import useFetch from "../hooks/useFetch";

export const CustomerContext = createContext<ICustomerContext>(null as any);

export const useCustomerContext = () => useContext(CustomerContext);

const CustomerContextProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const url = import.meta.env.VITE_BASE_URL;

  const {
    fetchData,
    data: user,
    error: errorMsg,
    isLoading,
  } = useFetch<IUser>();

  const navigate = useNavigate();

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    fetchData(`${url}/api/customer/authorize`, {
      method: "GET",
      credentials: "include",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (formData: ILoginForm): Promise<void> => {
    const result = await fetchData(`${url}/api/customer/login`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (result) toggleModal();
  };

  const logout = async (): Promise<void> => {
    await fetchData(`${url}/api/customer/logout`, {
      method: "POST",
      credentials: "include",
    });

    navigate("/");
  };

  return (
    <CustomerContext.Provider
      value={{
        login,
        errorMsg,
        isLoading,
        user,
        logout,
        toggleModal,
        isModalOpen,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
